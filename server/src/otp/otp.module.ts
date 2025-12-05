import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from 'src/common/jwt_secret';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
const { secret, expiresIn } = getJwtConfig();

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true
    }),
    TypeOrmModule.forFeature([Otp, User]), 
  ],
  controllers: [OtpController],
  providers: [OtpService, AuthService],
  exports: [OtpService]
})
export class OtpModule {}
