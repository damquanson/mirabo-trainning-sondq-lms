import { IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  questionname: string;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(3)
  difficultlevel: number;
  @IsNotEmpty()
  @Length(5, 10)
  answer1: string;
  @IsNotEmpty()
  answer2: string;
  @IsNotEmpty()
  answer3: string;
  @IsNotEmpty()
  correctanswer: number;
}
