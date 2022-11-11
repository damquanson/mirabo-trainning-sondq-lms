
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({default:30})
    role: number;

    

  
}