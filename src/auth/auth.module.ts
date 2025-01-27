import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt-auth.guards";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',
<<<<<<< HEAD
            signOptions: {expiresIn: '10m'}
=======
            signOptions: {expiresIn: '30m'}
>>>>>>> b9b5eb547266dcb67d96a4e9b98454d4a841c56e
        })
    ],
    providers: [
        AuthService,
        JwtStrategy,
        JwtAuthGuard
    ],
    controllers: [AuthController],

})

export class AuthModule {}