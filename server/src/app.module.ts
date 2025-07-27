import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubModule } from './club/club.module'; // Điều chỉnh path nếu khác
import { AthleteModule } from './athlete/athlete.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    MongooseModule.forRoot(process.env.MONGO_URI!), // Kết nối MongoDB
    ClubModule, AthleteModule, AuthModule, 
  ],
  controllers: [AuthController],
})
export class AppModule {}
