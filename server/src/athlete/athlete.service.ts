import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAthleteDto } from './dto/athlete.dto';
import { Athlete } from './entity/athlete.entity';

@Injectable()
export class AthleteService {
  constructor(
    @InjectRepository(Athlete)
    private athleteRepository: Repository<Athlete>,
  ) {}

  async create(createAthleteDto: CreateAthleteDto): Promise<any> {
    try {
      const athlete = this.athleteRepository.create(createAthleteDto);
      const saved = await this.athleteRepository.save(athlete);
      return {
        ...saved,
        _id: saved.uuid, // Đổi uuid thành _id trả về client
      };
    } catch (error) {
      console.error('Lỗi khi tạo vận động viên trong DB:', error.message, error.stack);
      throw new HttpException(`Lỗi khi tạo vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const athletes = await this.athleteRepository.find();
      return athletes.map(a => ({
        ...a,
        _id: a.uuid,
      }));
    } catch (error) {
      console.error('Lỗi khi lấy danh sách vận động viên:', error.message, error.stack);
      throw new HttpException(`Lỗi khi lấy danh sách vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(uuid: string): Promise<any> {
    try {
      const athlete = await this.athleteRepository.findOne({ where: { uuid } });
      if (!athlete) {
        throw new HttpException('Không tìm thấy vận động viên', HttpStatus.NOT_FOUND);
      }
      return {
        ...athlete,
        _id: athlete.uuid,
      };
    } catch (error) {
      console.error('Lỗi khi lấy vận động viên:', error.message, error.stack);
      throw new HttpException(`Lỗi khi lấy vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(uuid: string, updateAthleteDto: CreateAthleteDto): Promise<any> {
    try {
      const athlete = await this.athleteRepository.findOne({ where: { uuid } });
      if (!athlete) {
        throw new HttpException('Không tìm thấy vận động viên', HttpStatus.NOT_FOUND);
      }
      Object.assign(athlete, updateAthleteDto);
      const updated = await this.athleteRepository.save(athlete);
      return {
        ...updated,
        _id: updated.uuid,
      };
    } catch (error) {
      console.error('Lỗi khi cập nhật vận động viên:', error.message, error.stack);
      throw new HttpException(`Lỗi khi cập nhật vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(uuid: string): Promise<void> {
    try {
      const result = await this.athleteRepository.delete({ uuid });
      if (result.affected === 0) {
        throw new HttpException('Không tìm thấy vận động viên', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Lỗi khi xóa vận động viên:', error.message, error.stack);
      throw new HttpException(`Lỗi khi xóa vận động viên: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
