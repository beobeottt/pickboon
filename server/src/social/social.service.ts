import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Social } from './entity/social.entity';
import { Repository } from 'typeorm';
import { CreateSocialDto, UpdateSocialDto } from './dto/social.dto';

@Injectable()
export class SocialService {
    constructor(
        @InjectRepository(Social)
        private socialRepository: Repository<Social>,
    ){}

    async create(dto: CreateSocialDto): Promise<Social>{
        const social = this.socialRepository.create(dto);
        return this.socialRepository.save(social);
    }

    async findAll(): Promise<Social[]>{
        return this.socialRepository.find()
    }

    async findOne(id: string): Promise<Social>{
        const social = await this.socialRepository.findOneBy({id});
        if(!social){
            throw new NotFoundException(`Social with ID ${id} not found`);
        }
        return social
    }

    async update(id: string, dto: UpdateSocialDto): Promise<Social>
    {
        const social = await this.findOne(id);
        const updated = Object.assign(social, dto);
        return this.socialRepository.save(updated);
    }

    async remove(id: string): Promise<void>
    {
        const result = await this.socialRepository.delete(id);
        if(result.affected === 0)
        {
            throw new NotFoundException(`Social with ID ${id} not found`)
        }
    }
}
