import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Question } from './entities/question.entity';

// @UseGuards(JwtAuthGuard)
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll(@Query('page') page: number) {
    let query = {
      keyword: '',
      take: 5, // so luong ket qua trong 1 trang
      page: page,
    };
    return this.questionService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Question> {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.update(+id, updateQuestionDto);
  }
}
