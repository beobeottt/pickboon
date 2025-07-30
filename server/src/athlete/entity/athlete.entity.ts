// src/athlete/athlete.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from 'src/common/enums/gender.enum';

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'int', nullable: true })
  point: number;

  @Column({ nullable: true })
  image: string;
}
