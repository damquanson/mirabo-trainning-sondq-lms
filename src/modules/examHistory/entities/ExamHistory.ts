
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class ExamHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;
    @Column()
    examId: number;

    @Column()
    score: number;
    @Column({default:20})
    testtime: number;
   
    

  
}