import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Repository,DeleteResult, DataSource } from "typeorm";
import { Question } from './entities/question.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectDataSource() private dataSource: DataSource
){}
  create(createQuestionDto: CreateQuestionDto) {

    return this.questionRepository.save(createQuestionDto);
  }

  findAll() {
    return this.questionRepository.find();
  }

  findOne(id: number) {
    return this.questionRepository.findOneBy({id:id});
  }

  update(id: number, updateQuestionDto: CreateQuestionDto) {
    updateQuestionDto['id']=id;
    return this.questionRepository.save(updateQuestionDto);
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

}
