import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Repository, DeleteResult, DataSource, Like } from 'typeorm';
import { Question } from './entities/question.entity';
import { User } from '../user/entities/user.entity';


@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  async findAll(query) {
    const take = query.take;
    const page=query.page;
    const skip= (page-1) * take ;
    const keyword = query.keyword || ''
  
    const [result, total] = await this.questionRepository.findAndCount(
        {
            // where: { questionname: Like('%' + keyword + '%') }, //order: { questionname: "DESC" },
            take: take,
            skip: skip
        }
    );

    return {
        data: result,
        count: total
    }
}
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return await this.questionRepository.save(createQuestionDto);
  }

  // async findAll(): Promise<Question[]> {
  //   return await this.questionRepository.find();
  // }

  async findOne(id: number): Promise<Question> {
    return await this.questionRepository.findOneBy({ id: id });
  }

  async update(
    id: number,
    updateQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    updateQuestionDto['id'] = id;
    return await this.questionRepository.save(updateQuestionDto);
  }
}

