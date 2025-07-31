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

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Social> {
        const club = await this.clubService.findOne(id);
        if (!club) {
            throw new NotFoundException(`Club with ID ${id} not found`);
        }
        return club;
    }

    @Post()
    async create(@Body() createClubDto: CreateSocialDto): Promise<Social> {
        return this.clubService.create(createClubDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateClubDto: UpdateSocialDto): Promise<Social> {
        return this.clubService.update(id, updateClubDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.clubService.remove(id);
    }
}
