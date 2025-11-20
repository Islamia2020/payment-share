import { isNotEmpty, isEmail, IsOptional, IsEmail, IsNotEmpty } from "class-validator";
import { AccountVerified } from "src/users/user.entity";

export class CreateUserDto {
      @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  mobile_number?: string;

  @IsOptional()
  account_verified?: AccountVerified;
}
