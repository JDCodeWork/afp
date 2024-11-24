import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entities/user.entity';
import { CommonService } from '@/common/common.service';
import { ErrorCodes } from '@/common/interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly commonService: CommonService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles || validRoles.length == 0) return true;

    const req = context.switchToHttp().getRequest();

    const user = req.user as User;

    if (!user) this.commonService.handleErrors(ErrorCodes.CredentialsNotValid);

    if (validRoles.includes(user.role)) return true;

    this.commonService.handleErrors(ErrorCodes.UnauthorizedRequest);
  }
}
