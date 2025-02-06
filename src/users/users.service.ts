import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOneByEmail(createUserDto.email);

      if (existingUser) {
        throw new Error('Este e-mail já está registrado.');
      }

      const hashPass = await hash(createUserDto.password, 10);
      createUserDto.password = hashPass;

      return this.userRepository.create(createUserDto);
    } catch (error) {
      if (error.message === 'Este e-mail já está registrado.') {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string){
    return await this.userRepository.findOneByEmail(email)
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
