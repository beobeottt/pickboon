import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Athlete } from './entity/athlete.entity';
import { Repository } from 'typeorm';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';


@Injectable()
export class AthleteService {
  constructor(
    @InjectRepository(Athlete)
    private athleteRepository: Repository<Athlete>,
  ) {}

  async create(dto: CreateAthleteDto): Promise<Athlete> {
    const athlete = this.athleteRepository.create(dto);
    return this.athleteRepository.save(athlete);
  }

  async findAll(): Promise<Athlete[]> {
    return this.athleteRepository.find();
  }

  async findOne(id: string): Promise<Athlete> {
    const athlete = await this.athleteRepository.findOneBy({ id });
    if (!athlete) {
      throw new NotFoundException(`Athlete with ID ${id} not found`);
    }
    return athlete;
  }

  async update(id: string, dto: UpdateAthleteDto): Promise<Athlete> {
    const athlete = await this.findOne(id);
    const updated = Object.assign(athlete, dto);
    return this.athleteRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.athleteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Athlete with ID ${id} not found`);
    }
  }
}
