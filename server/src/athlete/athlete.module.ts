import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AthleteService } from './athlete.service';
import { AthleteController } from './athlete.controller';
import { Athlete, AthleteSchema } from './schemas/athlete.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Athlete])],
  providers: [AthleteService],
  controllers: [AthleteController],
})
export class AthleteModule {}
