import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubModule } from './club/club.module'; 
import { AthleteModule } from './athlete/athlete.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './athlete/entity/athlete.entity';
import { Club } from './club/entity/club.entity';
import { SocialModule } from './social/social.module';
import { Social } from './social/entity/social.entity';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
      ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Athlete, Club, Social],
        synchronize: true
      }),
      inject:[ConfigService],
    }), SocialModule,AthleteModule, ClubModule
  ],
  controllers: [AuthController],
})
export class AppModule {}
