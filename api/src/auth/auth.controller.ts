import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';
import { UpdateSettingDto } from '@api/setting/dto/update-setting.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() registerDto: RegisterDto, res: Response) {
    return this.authService.register(registerDto, res);
  }

  @Post('sign-in')
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/setting')
  @UseGuards(AuthGuard())
  async getSetting(@GetUser() user: User) {
    return this.authService.getSetting(user);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findOne(@GetUser() user: User) {
    return this.authService.findOne(user);
  }

  @Patch('setting')
  @UseGuards(AuthGuard())
  async updateSetting(
    @Body() updateSettingDto: UpdateSettingDto,
    @GetUser() user: User,
  ) {
    return this.authService.updateSetting(user, updateSettingDto);
  }

  @Patch()
  @UseGuards(AuthGuard())
  async update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.authService.update(user, updateUserDto);
  }

  @Post('refresh_token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('forgot_password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('change_password')
  async changePassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.changePassword(resetPasswordDto);
  }
}
