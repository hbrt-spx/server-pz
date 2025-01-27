import { Body, Controller, Get, Headers, Post, UnauthorizedException } from "@nestjs/common";
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
}