import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login-dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const user = await this.authService.validateUser(
            loginDto.email,
            loginDto.password
        );
        if (!user){
            throw new Error('Invalid Credentials');
        }
        return this.authService.login(user)
    }

    @Get('get-user')
    async getUser(@Headers("Authorization") authorization: string){
        const token = authorization.split(" ")[1]
        return token
    }
}