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
require('dotenv').config();
import { PostRefactoring1669709884520 } from './migrations/1669709884520-PostRefactoring';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Question, User, Exam, ExamHistory],
      migrations: [PostRefactoring1669709884520],
      migrationsTableName: 'migrations',
      synchronize: false,
      dropSchema: false,
    }),
    QuestionModule,
    ExamModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
