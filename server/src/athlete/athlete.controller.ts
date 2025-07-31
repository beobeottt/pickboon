import { Body, Controller, Post, Get, Param, Put, Delete, UseInterceptors, UploadedFile, Res, HttpException, HttpStatus } from '@nestjs/common';
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
  async create(@Body() createAthleteDto: CreateAthleteDto, @UploadedFile() file: Express.Multer.File) {
    try {
      if (file) {
        createAthleteDto.image = file.filename;
      }
      const athlete = await this.athleteService.create(createAthleteDto);
      return { message: 'Vận động viên được tạo thành công', data: athlete };
    } catch (error) {
      console.error('Lỗi khi tạo vận động viên:', error.message, error.stack);
      throw new HttpException(`Lỗi khi tạo vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('uploads/:filename')
getImage(@Param('filename') filename: string, @Res() res: Response) {
  const filePath = `./uploads/${filename}`;
  const defaultPath = './uploads/default.png';

  res.sendFile(filePath, (err) => {
    if (err) {
      console.warn(`Ảnh không tồn tại: ${filename}, trả về ảnh mặc định.`);
      res.sendFile(defaultPath);
    }
  });
}


  @Get()
  async findAll() {
    try {
      console.log('Đang gọi endpoint GET /athlete...');
      const athletes = await this.athleteService.findAll();
      console.log('Danh sách vận động viên:', athletes);
      return athletes;
    } catch (error) {
      console.error('Lỗi trong findAll:', error.message, error.stack);
      throw new HttpException(`Lỗi khi lấy danh sách vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const athlete = await this.athleteService.findOne(id);
      return athlete;
    } catch (error) {
      console.error('Lỗi khi lấy vận động viên:', error.message, error.stack);
      throw new HttpException(`Lỗi khi lấy vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAthleteDto: CreateAthleteDto) {
    try {
      const athlete = await this.athleteService.update(id, updateAthleteDto);
      return { message: 'Vận động viên được cập nhật thành công', data: athlete };
    } catch (error) {
      console.error('Lỗi khi cập nhật vận động viên:', error.message, error.stack);
      throw new HttpException(`Lỗi khi cập nhật vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.athleteService.remove(id);
      return { message: 'Vận động viên được xóa thành công' };
    } catch (error) {
      console.error('Lỗi khi xóa vận động viên:', error.message, error.stack);
      throw new HttpException(`Lỗi khi xóa vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}