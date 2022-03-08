import { JwtStrategy } from './guards/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, JwtGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
