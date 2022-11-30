import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository, DeleteResult, DataSource } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { Exam } from './entities/exam.entity';
import { Question } from '../question/entities/question.entity';
import { ExamHistory } from '../examHistory/entities/ExamHistory';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async findAll(query) {
    const take = query.take;
    const page = query.page;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';
    console.log(take);
    console.log(page);
    const [result, total] = await this.examRepository.findAndCount({
      // where: { questionname: Like('%' + keyword + '%') }, //order: { questionname: "DESC" },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }
  async findOne(id: number): Promise<Exam> {
    let exam = await this.examRepository.findOneBy({ examId: id });

    return exam;
  }

  create(createExamDto: CreateExamDto): Promise<Exam> {
    return this.examRepository.save(createExamDto);
  }
  update(id: number, createExamDto: CreateExamDto): Promise<Exam> {
    createExamDto['examId'] = id;
    return this.examRepository.save(createExamDto);
  }
  remove(id: number): Promise<DeleteResult> {
    return this.examRepository.delete(id);
  }
  // ham tra ve 1 set gom 4 phan tu random giua 2 so nguyen start va end
  getRandom(start, end): Set<number> {
    const myset = new Set<number>();
    for (let i = 0; i < 20; i++) {
      let num = Number(Math.floor(Math.random() * (end + 1 - start)) + start);
      myset.add(num);
      if (myset.size == 4) break;
    }
    return myset;
  }

  //Lam bai theo id de, ngau nhien ham tra ve 4 cau hoi
  async doExam(id: number): Promise<Question[]> {
    const question1 = await this.dataSource.manager
      .createQueryBuilder(Question, 'question')
      .where('question.examId = :id1', { id1: id })
      .getMany();
    let q2 = this.getRandom(0, question1.length - 1);
    let q3 = Array.from(q2);
    let q4 = [];
    for (let i = 0; i < 4; i++) {
      let q5 = parseInt('' + q3[i]);
      q4.push(question1[q5]);
    }

    console.log(q3);
    return q4;
  }

  async getResult(ide: number, idu: number, Body): Promise<number> {
    let point = 0;
    for (var key in Body) {
      if (Body.hasOwnProperty(key)) {
        let value = Body[key];

        const question1 = await this.dataSource.manager
          .createQueryBuilder(Question, 'question')
          .where('question.id = :id1', { id1: key })
          .getOne();
        if (value == question1.correctanswer) point++;
      }
    }
    const q2 = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(ExamHistory)
      .values([{ userId: idu, examId: ide, score: point }])
      .execute();
    return point;
  }
  async getHistory(id: number): Promise<ExamHistory[]> {
    let history = await this.dataSource.manager
      .createQueryBuilder(ExamHistory, 'examhistory')
      .where('examhistory.userId=:userid', { userid: id })
      .getMany();
    console.log(history);
    return history;
  }
  async rank(ide: number): Promise<ExamHistory[]> {
    var data = this.dataSource;
    let listrank = await this.dataSource.manager
      .createQueryBuilder(ExamHistory, 'examhistory')
      .where('examhistory.examId =:score', { score: ide })
      .orderBy('score', 'DESC')
      .getMany();
    let rank = await this.dataSource.manager
      .createQueryBuilder(User, 'user')

      .leftJoinAndSelect(
        ExamHistory,
        'examhistory',
        'user.userId=examhistory.userId',
      )
      .where('examhistory.examId =:score', { score: ide })
      .orderBy('score', 'DESC')
      .getMany();

    listrank.forEach((element) => {
      let user = rank.find(function (a) {
        return element.userId == a.userId;
      });
      element['username'] = user.username;
    });

    return listrank;
  }
}
