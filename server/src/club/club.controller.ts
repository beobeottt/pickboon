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
  import { ClubService } from './club.service';
  import { Club } from './Schemas/club.schema';
import { CreateClubDto, UpdateClubDto } from './dto/club.dto';

  
  @Controller('clubs')
  export class ClubController {
    constructor(private readonly clubService: ClubService) {}
  
    @Get()
    async findAll(): Promise<Club[]> {
      return this.clubService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Club> {
      const club = await this.clubService.findOne(id);
      if (!club) {
        throw new NotFoundException(`Club with ID ${id} not found`);
      }
      return club;
    }
  
    // @Post()
    // async create(@Body() createClubDto: CreateClubDto): Promise<Club> {
    //   return this.clubService.create(createClubDto);
    // }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto): Promise<Club> {
      return this.clubService.update(id, updateClubDto);
    }
  
    // @Delete(':id')
    // async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    //   return this.clubService.remove(id);
    // }
  }
  