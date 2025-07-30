import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubModule } from './club/club.module'; // Điều chỉnh path nếu khác
import { AthleteModule } from './athlete/athlete.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './athlete/entity/athlete.entity';
import { Club } from './club/Schemas/club.schema';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
      ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Athlete, Club],
        synchronize: true
      }),
      inject:[ConfigService],
    }),
  ],
  controllers: [AuthController],
})
export class AppModule {}
