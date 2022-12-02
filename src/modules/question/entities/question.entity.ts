
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionName: string;
    @Column()
    difficultLevel: number;

    @Column()
    answer1: string;

    @Column()
    answer2: string;
    @Column()
    answer3: string;
    @Column()
    correctAnswer: number;
    @Column()
    examId: number;
    @Column({ default: true})
    isAvailable: boolean;
}