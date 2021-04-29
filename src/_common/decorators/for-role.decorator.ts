import { SetMetadata } from '@nestjs/common';
import { Role as RoleEnum } from '../enums/role';

export const ROLE_KEY = 'role';

export const ForRole = (role: RoleEnum) => SetMetadata(ROLE_KEY, role);
