import { IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  questionName: string;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(3)
  difficultLevel: number;
  @IsNotEmpty()
  @Length(5, 10)
  answer1: string;
  @IsNotEmpty()
  answer2: string;
  @IsNotEmpty()
  answer3: string;
  @IsNotEmpty()
  correctAnswer: number;
}
