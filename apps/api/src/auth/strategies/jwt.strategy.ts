import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/common.service';
import { ErrorCodes } from '../../common/interfaces/error-codes.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {
    super({
      secretOrKey: configService.get('SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    const user = await this.userService.findOneByEmail(email);

    if (!user) this.commonService.handleErrors(ErrorCodes.TokenNotValid);

    delete user.password, user.name, user.email;

    return user;
  }
}
