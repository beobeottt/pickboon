import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Club{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column({type: 'int', nullable: true})
    members: number;

    @Column({nullable: true})
    logo: string;
}