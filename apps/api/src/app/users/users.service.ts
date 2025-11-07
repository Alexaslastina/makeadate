import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserEntity, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserEntity.name) private readonly model: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.model.findOne({ email: dto.email });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // Create user
    const user = await this.model.create({
      email: dto.email,
      passwordHash,
      role: 'user',
    });

    // Return user without password hash
    const userObj = user.toObject();
    delete (userObj as any).passwordHash;
    return userObj;
  }

  findAll() { 
    return this.model.find().select('-passwordHash').lean(); 
  }

  async findByEmail(email: string) {
    const u = await this.model.findOne({ email }).lean();
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async updateRole(id: string, role: 'customer' | 'admin') {
    const user = await this.model.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-passwordHash').lean();
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  async getStats() {
    const totalUsers = await this.model.countDocuments();
    const totalAdmins = await this.model.countDocuments({ role: 'admin' });
    const totalCustomers = await this.model.countDocuments({ role: 'customer' });
    
    return {
      totalUsers,
      totalAdmins,
      totalCustomers,
    };
  }

  remove(id: string) { 
    return this.model.findByIdAndDelete(id); 
  }
}

