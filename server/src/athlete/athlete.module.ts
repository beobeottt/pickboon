import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AthleteService } from './athlete.service';
import { AthleteController } from './athlete.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './entity/athlete.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Athlete])],
  providers: [AthleteService],
  controllers: [AthleteController],
})
export class AthleteModule {}
