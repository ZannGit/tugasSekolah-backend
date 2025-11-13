import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }


  async signIn(name: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findName(name);

    const passwordMatch = await bcryptjs.compare(pass, user?.password || '');
    
    if (!user || !passwordMatch ) {
      throw new UnauthorizedException();
    }


    const payload = { sub: user.id, username: user.name, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
