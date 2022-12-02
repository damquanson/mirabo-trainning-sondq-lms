
import { ExamHistory } from "src/modules/examHistory/entities/ExamHistory";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    userName: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({default:30})
    role: number;
    
    

  
}