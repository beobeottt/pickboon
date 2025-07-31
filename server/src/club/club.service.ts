import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Club } from "./Schemas/club.schema";
import { Repository } from "typeorm";
import { CreateClubDto, UpdateClubDto } from "./dto/club.dto";

@Injectable()
export class ClubService{
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ){}
  
  async create(dto: CreateClubDto): Promise<Club>{
    const club = this.clubRepository.create(dto);
    return this.clubRepository.save(club);
  }

  async findAll(): Promise<Club[]>{
    return this.clubRepository.find()
  }

  async findOne(id: string): Promise<Club>{
    const club = await this.clubRepository.findOneBy({id});
    if(!club)
    {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
    return club;
  }

  async update(id: string, dto: UpdateClubDto): Promise<Club>{
    const club = await this.findOne(id);
    const updated = Object.assign(club, dto);
    return this.clubRepository.save(updated);
  }

  async remove(id: string): Promise<void>
  {
    const result = await this.clubRepository.delete(id);
    if(result.affected === 0)
    {
      throw new NotFoundException(`Club with ID ${id} not found`)
    }
  }
}