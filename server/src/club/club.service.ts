import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entity/club.entity';
import { CreateClubDto, UpdateClubDto } from './dto/club.dto';
import { Social } from 'src/social/entity/social.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async create(createClubDto: CreateClubDto): Promise<Club> {
    
      const club = this.clubRepository.create(createClubDto);
      return await this.clubRepository.save(club);
  }

  async findAll(): Promise<Club[]> {
    return this.clubRepository.find()
  }

  async findOne(uuid: string): Promise<Social> {
      const club = await this.clubRepository.findOneBy({uuid});
      if (!club) {
        throw new HttpException('Không tìm thấy club', HttpStatus.NOT_FOUND);
      }
      return club
  }

  async update(id: string, updateClubDto: UpdateClubDto): Promise<Club> {
    const club = await this.findOne(id);
    const updated = Object.assign(club, updateClubDto);
    return this.clubRepository.save(updated)
  }

  async remove(id: string): Promise<void> {
    
      const result = await this.clubRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Không tìm thấy club', HttpStatus.NOT_FOUND);
  }
}
}
