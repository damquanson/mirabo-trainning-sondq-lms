import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Question } from '../question/entities/question.entity';
import { Exam } from './entities/exam.entity';
import { ExamHistory } from '../examHistory/entities/ExamHistory';
import { DeleteResult } from 'typeorm';

//@UseGuards(JwtAuthGuard)
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get('doexam/:id')
  doexam(@Param('id') id: string): Promise<Question[]> {
    return this.examService.doExam(parseInt(id));
  }
  @Post('result/:ide/:idu')
  getResult(
    @Param('ide') ide: number,
    @Param('idu') idu: number,
    @Body() Body,
  ): Promise<number> {
    return this.examService.getResult(ide, idu, Body);
  }
  @Post()
  create(@Body() createExamDto: CreateExamDto): Promise<Exam> {
    return this.examService.create(createExamDto);
  }

  @Get()
  findAll(): Promise<Exam[]> {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Exam> {
    return this.examService.findOne(id);
  }
  @Get('rank/:id')
  rank(@Param('id') id: number): Promise<ExamHistory[]> {
    return this.examService.rank(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createExamDto: CreateExamDto,
  ): Promise<Exam> {
    return this.examService.update(parseInt(id), createExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.examService.remove(+id);
  }
  @Get('history/:id')
  getHistory(@Param('id') id: number): Promise<ExamHistory[]> {
    return this.examService.getHistory(id);
  }
}
