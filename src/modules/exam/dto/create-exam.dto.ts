import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator/types/decorator/decorators';
export class CreateExamDto {
  @IsNotEmpty()
  examName: string;
  @IsNotEmpty()
  timeLimit: number;
  @IsNotEmpty()
  subjectId: number;
}
