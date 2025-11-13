
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from './auth.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/role.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { name: string; password: string }) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin', 'user'])
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


 


}
