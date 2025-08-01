import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    Delete,
    NotFoundException,
} from '@nestjs/common';
import { SocialService } from './social.service';
import { Social } from './entity/social.entity';
import { CreateSocialDto, UpdateSocialDto } from './dto/social.dto';
@Controller('social')
export class SocialController {
    constructor(private readonly clubService: SocialService) { }

    @Get()
    async findAll(): Promise<Social[]> {
        return this.clubService.findAll();
    }

    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string): Promise<Social> {
        const social = await this.clubService.findOne(uuid);
        if (!social) {
            throw new NotFoundException(`Club with ID ${uuid} not found`);
        }
        return social;
    }

    @Post()
    async create(@Body() createClubDto: CreateSocialDto): Promise<Social> {
        return this.clubService.create(createClubDto);
    }

    @Put(':uuid')
    async update(@Param('uuid') uuid: string, @Body() updateClubDto: UpdateSocialDto): Promise<Social> {
        return this.clubService.update(uuid, updateClubDto);
    }

    @Delete(':uuid')
    async remove(@Param('uuid') uuid: string) {
        return this.clubService.remove(uuid);
    }
}
