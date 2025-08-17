import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserItemResource } from './resources/user.item.resource';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';
import { SettingService } from '@api/setting/setting.service';
import { ResendService } from '@api/common/resend/resend.service';
import { UpdateSettingDto } from '@api/setting/dto/update-setting.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly settingService: SettingService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly resendService: ResendService,
  ) {}

  async register(registerDto: RegisterDto, res: Response) {
    try {
      const { password, ...rest } = registerDto;

      const user = this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      await this.settingService.create(user, res);

      return {
        message: 'User created successfully',
        statusCode: 201,
      };
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
      throw new HttpException(error.message, error.status);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) throw new NotFoundException('User not found');

      const checkPassword = bcrypt.compareSync(password, user.password);

      if (!checkPassword) throw new BadRequestException('Password incorrect');

      const access_token = this.jwtService.sign({ id: user.id });
      const refreshToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      );

      await this.userRepository.update(user.id, { refreshToken });

      return {
        ...UserItemResource(user),
        access_token,
        refresh_token: refreshToken,
        expires_in: this.jwtService.decode(access_token).exp,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(data: User) {
    try {
      const { id } = data;
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) throw new NotFoundException('User not found');

      return {
        ...UserItemResource(user),
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(data: User, updateUserDto: UpdateUserDto) {
    try {
      const { id } = data;
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) throw new NotFoundException('User not found');

      await this.userRepository.update(user.id, updateUserDto);

      return {
        message: 'User updated successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { refreshToken } = refreshTokenDto;
      const user = await this.userRepository.findOne({
        where: { refreshToken: refreshToken },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new NotFoundException('User not found or invalid refresh token');
      }

      const payload = { id: user.id };
      const newAccessToken = this.jwtService.sign(payload);
      const newRefreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      });

      await this.userRepository.update(user.id, {
        refreshToken: newRefreshToken,
      });

      return {
        ...UserItemResource(user),
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: this.jwtService.decode(newAccessToken).exp,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async forgotPassword({ email, url: frontUrl }: ForgotPasswordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) throw new NotFoundException('User Not Found');

      await this.userRepository.update(user.id, {
        resetPasswordToken: this.jwtService.sign(
          { id: user.id },
          {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: '1h',
          },
        ),
      });

      const url = `${frontUrl}?token=${user.resetPasswordToken}`;

      // Sent Email
      // await this.resendService.sendEmail(
      //   email,
      //   'forgot-password',
      //   ForgotPasswordEmail({ name: user.name, url: url }),
      // );

      return {
        message: 'Sent Email Successfully',
        statsCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async changePassword({ password, token }: ResetPasswordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { resetPasswordToken: token },
      });

      if (!user) throw new NotFoundException('User Not Found or Invalid Token');

      const comparePassword = bcrypt.compareSync(password, user.password);

      if (comparePassword)
        throw new BadRequestException('Password is the same');

      await this.userRepository.update(user.id, {
        password: bcrypt.hashSync(password, 10),
      });

      return {
        message: 'Password Changed Successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getSetting(user: User) {
    return this.settingService.findOne(user);
  }

  async updateSetting(user: User, updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(user, updateSettingDto);
  }
}
