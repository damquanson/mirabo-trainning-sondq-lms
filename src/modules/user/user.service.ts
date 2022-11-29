import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { ResponseUserDto } from './dto/response-user.dto';
const bcrypt = require('bcrypt');
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const saltOrRounds = await bcrypt.genSalt();
    const passwordTemp = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    createUserDto.password = passwordTemp;
    let user = await this.userRepo.save(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepo.findOneBy({ userId: parseInt(id) });
  }
  async findOneName(email: string): Promise<User> {
    return await this.userRepo.findOneBy({ email: email });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    updateUserDto['userId'] = id;
    return await this.userRepo.save(updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
