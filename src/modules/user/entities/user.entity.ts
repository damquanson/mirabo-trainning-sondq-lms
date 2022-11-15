
import { ExamHistory } from "src/modules/examHistory/entities/ExamHistory";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    @OneToMany((type) => ExamHistory, (examHistory) => examHistory.idUser)
    examHistory: ExamHistory[]
    

  
}