import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get('roles', context.getHandler());
    const request: any = context.switchToHttp().getRequest();
    const user = await this.userService.getUserProfile(
      request.headers.authorization.split(' ')[1],
    );
    const role = user.roles;
    if (roles.includes(role)) return true;
    return false;
  }
}
