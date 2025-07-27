import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Athlete } from './schemas/athlete.schema';
import { CreateAthleteDto } from './dto/athlete.dto';

@Injectable()
export class AthleteService {
  constructor(
    @InjectModel(Athlete.name) private athleteModel: Model<Athlete>,
  ) {}

  async create(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    const createdAthlete = new this.athleteModel(createAthleteDto);
    return createdAthlete.save();
  }

  async findAll(): Promise<Athlete[]> {
    return this.athleteModel.find().exec();
  }

  async findOne(id: string): Promise<Athlete> {
    const athlete = await this.athleteModel.findById(id).exec();
    if (!athlete) {
      throw new NotFoundException(`Athlete with ID ${id} not found`);
    }
    return athlete;
  }

  async update(id: string, updateAthleteDto: CreateAthleteDto): Promise<Athlete> {
    const updatedAthlete = await this.athleteModel
      .findByIdAndUpdate(id, updateAthleteDto, { new: true })
      .exec();
    if (!updatedAthlete) {
      throw new NotFoundException(`Athlete with ID ${id} not found`);
    }
    return updatedAthlete;
  }

  async remove(id: string): Promise<void> {
    const result = await this.athleteModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Athlete with ID ${id} not found`);
    }
  }
}
