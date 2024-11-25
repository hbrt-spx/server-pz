import { User } from "@prisma/client";
import prisma from "src/prismaClient";
import { UpdateUserDto } from "./dto/update-user.dto";


export class UserRepository {
    

    async findAll(){
        const users = await prisma.user.findMany();
        console.log(users)
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
    
    async create(data: {name: string; email: string; password: string}): Promise<User>{
    return prisma.user.create({
        data,
    });
}
}