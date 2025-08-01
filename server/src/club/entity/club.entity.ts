import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Club{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column({type: 'int', nullable: true})
    members: number;

    @Column({nullable: true})
    logo: string;

    @Column()
    date: Date;

    @Column({type: 'float', nullable: true})
    point: number;

    @Column({type: 'float', nullable: true})
    price: number;
}