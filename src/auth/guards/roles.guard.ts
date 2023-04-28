import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/toke.model';
import { Role } from '../models/rol.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles || roles?.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const hasPermissions = roles.includes(user.role as Role);

    if (!hasPermissions) {
      throw new UnauthorizedException('don`t have permissions');
    }

    return hasPermissions;
  }
}
