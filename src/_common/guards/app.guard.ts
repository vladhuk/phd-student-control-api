import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

/**
 * This guard combine all other guards, which we need to use globally, because
 * NestJS does not allow using multiple global guards
 */
@Injectable()
export class GlobalGuard implements CanActivate {
  constructor(
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly rolesGuard: RolesGuard
  ) {}

  canActivate(context: ExecutionContext) {
    return [this.jwtAuthGuard, this.rolesGuard].reduce(
      async (acc, currentGuard) => {
        const awaitedAcc = await acc;
        const currentCanActivate = await currentGuard.canActivate(context);
        return awaitedAcc && currentCanActivate;
      },
      Promise.resolve(true)
    ) as Promise<boolean>;
  }
}
