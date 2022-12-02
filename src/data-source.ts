import { DataSource } from "typeorm/data-source/DataSource";
import { PostRefactoring1669709884520 } from "./migrations/1669709884520-PostRefactoring";
import { Exam } from "./modules/exam/entities/exam.entity";
import { ExamHistory } from "./modules/examHistory/entities/ExamHistory";
import { Question } from "./modules/question/entities/question.entity";
import { User } from "./modules/user/entities/user.entity";

 const AppDataSource = new DataSource({
    type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Question,User,Exam,ExamHistory],
      migrations: [PostRefactoring1669709884520],
      migrationsTableName: "migrations",
      synchronize: false,
      dropSchema: false
})
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))