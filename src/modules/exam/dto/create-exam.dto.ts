import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
export class CreateExamDto {
  @IsNotEmpty()
  examName: string;
  @IsNotEmpty()
  timeLimit: number;
  @IsNotEmpty()
  subjectId: number;
}
