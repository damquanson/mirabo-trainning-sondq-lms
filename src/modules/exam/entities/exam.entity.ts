
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Exam {
    @PrimaryGeneratedColumn()
    examId: number;

    @Column()
    examName: string;
    @Column({default:30})
    timeLimit: number;

    @Column()
    subjectId: number;

  
}