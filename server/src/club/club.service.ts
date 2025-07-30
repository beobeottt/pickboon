import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Club } from './Schemas/club.schema';
import { UpdateClubDto } from './dto/club.dto';


@Injectable()
export class ClubService {
  constructor(
    @InjectModel(Club.name) private clubModel: Model<Club>,
  ) {}

  async findAll(): Promise<Club[]> {
    return this.clubModel.find().exec();
  }

  async findOne(id: string): Promise<Club> {
    const club = await this.clubModel.findById(id).exec();
    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
    return club;
  }

  async update(id: string, updateClubDto: UpdateClubDto): Promise<Club> {
    const updatedClub = await this.clubModel.findByIdAndUpdate(
      id,
      updateClubDto,
      { new: true },
    ).exec();

    if (!updatedClub) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }

    return updatedClub;
  }

  async delete(id: string): Promise<Club> {
    const deleted = await this.clubModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
    return deleted;
  }
}
