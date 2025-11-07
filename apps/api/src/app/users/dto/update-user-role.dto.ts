import { IsString, IsIn } from 'class-validator';

export class UpdateUserRoleDto {
  @IsString()
  @IsIn(['customer', 'admin'], { message: 'Role must be either "customer" or "admin"' })
  role!: 'customer' | 'admin';
}

