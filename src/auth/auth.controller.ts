<<<<<<< HEAD
import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
=======
import { Body, Controller, Get, Headers, Post, UnauthorizedException } from "@nestjs/common";
>>>>>>> b9b5eb547266dcb67d96a4e9b98454d4a841c56e
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

<<<<<<< HEAD
    @Get('get-user')
    async getUser(@Headers("Authorization") authorization: string){
        const token = authorization.split(" ")[1]
        return token
    }
=======
   @Get('get-user')
  async getUser(@Headers('Authorization') authorization: string) {
   
    if (!authorization) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token inválido');
    }

    try {
     
      const userData = await this.authService.verifyToken(token);      
      return userData;

    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
}
>>>>>>> b9b5eb547266dcb67d96a4e9b98454d4a841c56e
}