import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Route de login
   * POST /auth/login
   * Body: { userName: string, userPassword: string }
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: { userName: string; userPassword: string }) {
    const user = await this.authService.login(credentials.userName, credentials.userPassword);
    return user;
  }
}
