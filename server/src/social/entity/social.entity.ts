import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Social{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column({unique: true})
    location: string;

    @Column()
    members: number;

    @Column()
    logo: string;

    @Column()
    date: Date;

    @Column({type: 'float', nullable: true})
    point: number;

    @Column({type: 'float', nullable: true})
    price: number;

}

