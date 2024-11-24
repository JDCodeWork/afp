import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CommonService } from '@/common/common.service';
import { ErrorCodes } from '@/common/interfaces';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.userService.findById(id);

    if (!user) this.commonService.handleErrors(ErrorCodes.CredentialsNotValid);

    return user;
  }
}
