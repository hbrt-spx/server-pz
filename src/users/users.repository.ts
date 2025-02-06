import { User } from "@prisma/client";
import prisma from "src/prismaClient";
import { UpdateUserDto } from "./dto/update-user.dto";


export class UserRepository {
    

    async findAll(){
        const users = await prisma.user.findMany();
        return users
    }

    async findOne(userId: string){
        const foundUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return foundUser
    }

    async findOneByEmail(email: string): Promise<User | null>{
        return prisma.user.findUnique({
            where: {email},
        })
    }
    
    async create(data: {name: string; email: string; password: string, confirm?: string}): Promise<User>{
        const { confirm: _, ...userData } = data
    return prisma.user.create({
        data: {
            ...userData,
        }
    });
}
}