import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepo.findOneBy({ userId: parseInt(id) });
  }

  update(id: number, updateUserDto: CreateUserDto) {
    updateUserDto['userId']=id;
    return this.userRepo.save(updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }
}
