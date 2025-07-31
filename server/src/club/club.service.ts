import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entity/club.entity';
import { CreateClubDto, UpdateClubDto } from './dto/club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async create(createClubDto: CreateClubDto): Promise<any> {
    try {
      const club = this.clubRepository.create(createClubDto);
      const saved = await this.clubRepository.save(club);
      return {
        ...saved,
        _id: saved.uuid,
      };
    } catch (error) {
      console.error('Lỗi khi tạo club:', error.message, error.stack);
      throw new HttpException(`Lỗi khi tạo club: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const clubs = await this.clubRepository.find();
      return clubs.map(c => ({
        ...c,
        _id: c.uuid,
      }));
    } catch (error) {
      console.error('Lỗi khi lấy danh sách club:', error.message, error.stack);
      throw new HttpException(`Lỗi khi lấy danh sách club: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(uuid: string): Promise<any> {
    try {
      const club = await this.clubRepository.findOne({ where: { uuid } });
      if (!club) {
        throw new HttpException('Không tìm thấy club', HttpStatus.NOT_FOUND);
      }
      return {
        ...club,
        _id: club.uuid,
      };
    } catch (error) {
      console.error('Lỗi khi lấy club:', error.message, error.stack);
      throw new HttpException(`Lỗi khi lấy club: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(uuid: string, updateClubDto: UpdateClubDto): Promise<any> {
    try {
      const club = await this.clubRepository.findOne({ where: { uuid } });
      if (!club) {
        throw new HttpException('Không tìm thấy club', HttpStatus.NOT_FOUND);
      }
      Object.assign(club, updateClubDto);
      const updated = await this.clubRepository.save(club);
      return {
        ...updated,
        _id: updated.uuid,
      };
    } catch (error) {
      console.error('Lỗi khi cập nhật club:', error.message, error.stack);
      throw new HttpException(`Lỗi khi cập nhật club: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(uuid: string): Promise<void> {
    try {
      const result = await this.clubRepository.delete({ uuid });
      if (result.affected === 0) {
        throw new HttpException('Không tìm thấy club', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Lỗi khi xóa club:', error.message, error.stack);
      throw new HttpException(`Lỗi khi xóa club: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
