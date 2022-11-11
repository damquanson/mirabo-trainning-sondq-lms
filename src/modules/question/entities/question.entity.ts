
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionname: string;
    @Column()
    difficultlevel: number;

    @Column()
    answer1: string;

    @Column()
    answer2: string;
    @Column()
    answer3: string;
    @Column()
    correctanswer: number;
    @Column()
    examId: number;
    @Column({ default: true})
    isAvailable: boolean;
}