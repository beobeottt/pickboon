import { Body, Controller, Post, Get, Param, Put, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CreateAthleteDto } from './dto/athlete.dto';
import { AthleteService } from './athlete.service';
import { uploadConfig } from '../common/middleware/upload.middleware';

@Controller('athlete')
export class AthleteController {
    constructor(private readonly athleteService: AthleteService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', uploadConfig))
  create(@Body() createAthleteDto: CreateAthleteDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      createAthleteDto.image = file.filename;
    }
    return this.athleteService.create(createAthleteDto);
  }

  @Get('uploads/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' });
  }

  @Get()
  findAll() {
    return this.athleteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.athleteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAthleteDto: CreateAthleteDto) {
    return this.athleteService.update(id, updateAthleteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.athleteService.remove(id);
  }
}
