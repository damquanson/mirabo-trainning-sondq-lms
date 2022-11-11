
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class ExamHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idUser: number;
    @Column()
    idExam: number;

    @Column()
    score: number;
    @Column({default:20})
    testtime: number;
    date:Date;

  
}