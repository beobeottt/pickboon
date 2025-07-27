import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AthleteService } from './athlete.service';
import { AthleteController } from './athlete.controller';
import { Athlete, AthleteSchema } from './schemas/athlete.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Athlete.name, schema: AthleteSchema }])],
  providers: [AthleteService],
  controllers: [AthleteController]
})
export class AthleteModule {}
