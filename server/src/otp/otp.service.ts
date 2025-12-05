import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { VerifyOTPDto } from './dto/verify.dto';
import { AccountVerified, User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { response } from 'src/common/response';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepo: Repository<Otp>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly authService: AuthService,
  ) {}

  async create(createOtpDto: CreateOtpDto): Promise<Otp> {
    const { user_id, otp, ...rest } = createOtpDto;
    console.table(createOtpDto);

    // Generate salt and hash
    const saltRounds = 10;
    const EXPIRATION_MINUTES = 2;
    const hashedOtp = await bcrypt.hash(otp, saltRounds);
    const now = new Date(); 
    const expiresAt = new Date(now.getTime() + EXPIRATION_MINUTES * 60000); // expires 2 mins later

    const otpEntity = this.otpRepo.create({
      ...rest,
      otp_hash: hashedOtp,
      expires_at: expiresAt,
      user: {id: user_id}
    });

    return await this.otpRepo.save(otpEntity);
  }

  async verifyOTP({email, otp}: VerifyOTPDto) {
    const otpRecord = await this.otpRepo.findOne({
      where: {user: {email}, used: false },
      relations: ['user'],
      order: {created_at: 'DESC' }
    });

    if( !otpRecord ) {
      return response (false, "OTP not found or already used!", null );
    }

    if( new Date() > otpRecord.expires_at ) {
      return response (false, "OTP expired!", null );
    }

    const isMatch = await bcrypt.compare( otp, otpRecord.otp_hash );
    if( !isMatch ) {
      otpRecord.attempts++;
      await this.otpRepo.save(otpRecord);
      return response(false, "Invalid OTP!", null );
    }

    otpRecord.used = true;
    await this.otpRepo.save(otpRecord);

    otpRecord.user.accountVerified = AccountVerified.yes;
    await this.userRepo.save(otpRecord.user);

    const payload = { id: otpRecord.user.id, email: otpRecord.user.email };
    
    const token = this.authService.getToken(payload);

    return response(true, "OTP verified successfully!", {
      user: otpRecord.user,
      token: token.token,
    }); 
  }

  findAll() {
    return `This action returns all otp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }
}
