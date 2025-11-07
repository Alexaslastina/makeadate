import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get() list() { 
    return this.users.findAll(); 
  }

  @Get('stats/overview')
  getStats() {
    return this.users.getStats();
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  @Get(':email') byEmail(@Param('email') email: string) { 
    return this.users.findByEmail(email); 
  }

  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() dto: UpdateUserRoleDto) {
    return this.users.updateRole(id, dto.role);
  }

  @Delete(':id') remove(@Param('id') id: string) { 
    return this.users.remove(id); 
  }
}

