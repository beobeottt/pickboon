import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    Delete,
    NotFoundException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto, UpdateClubDto } from './dto/club.dto';
import { Club } from './entity/club.entity';

  
  @Controller('club')
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
  
    @Post()
    async create(@Body() createClubDto: CreateClubDto): Promise<Club> {
      return this.clubService.create(createClubDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto): Promise<Club> {
      return this.clubService.update(id, updateClubDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      try{
        await this.clubService.remove(id);
        return {message: 'club đã được xoá thành công'};
      }
      catch(error){
        console.log('lỗi khi xoá club', error.message, error.stack);
        throw new HttpException(`Lỗi khi xóa club: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
    }
  }
  