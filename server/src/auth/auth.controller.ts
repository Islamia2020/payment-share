import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('token')
  getToken(@Body() user: { id: number; email: string }) {    
    return this.authService.getToken(user);
  }
}
