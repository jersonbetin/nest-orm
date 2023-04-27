import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../models/toke.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  generateJWT(user: User) {
    const { role, id } = user;
    const payload: PayloadToken = { role, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    const isMatch = await compare(password, user.password);

    if (user && isMatch) {
      return user;
    }

    return null;
  }
}
