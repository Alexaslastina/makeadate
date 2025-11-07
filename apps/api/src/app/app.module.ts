import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/makeadate'),
    UsersModule,
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

