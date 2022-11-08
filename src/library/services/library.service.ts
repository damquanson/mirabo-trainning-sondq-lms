import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository,DeleteResult } from "typeorm";
import { Book } from "../entities/book.entity";


@Injectable()
export class LibraryService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ){}

    findAll(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    findOne(id: string): Promise<Book> {
        console.log("hello");
        console.log(parseInt(id));
        return this.bookRepository.findOneBy({id:parseInt(id)});
       
    }
    
    createBook(book: Book): Promise<Book> {
        return this.bookRepository.save(book);
    }
    deleteBook(id:number): Promise<DeleteResult> {
        console.log("hello");
        return this.bookRepository.delete(id);
    }
}