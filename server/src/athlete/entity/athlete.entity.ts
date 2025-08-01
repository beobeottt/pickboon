
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from 'src/common/enums/gender.enum';

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'float', nullable: true })
  point: number;

  @Column({ nullable: true })
  image: string;
}
