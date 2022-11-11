import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Question } from './modules/question/entities/question.entity';
import { User } from './modules/user/entities/user.entity';
import { Exam } from './modules/exam/entities/exam.entity';

import { UserModule } from './modules/user/user.module';
import { QuestionModule } from './modules/question/question.module';
import { ExamModule } from './modules/exam/exam.module';
import { ExamHistory } from './modules/examHistory/entities/ExamHistory';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'lms',
      entities: [Question,User,Exam,ExamHistory],
      synchronize: true,
      dropSchema: false
    }),QuestionModule,ExamModule, AuthModule,UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}