import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/users/users.repository";
import * as bcrypt from 'bcryptjs'
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
      }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

    async login(user: User){
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async verifyJwt(token: string){
      return {
        data: this.jwtService.verify(token)
      }
    }
}