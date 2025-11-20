import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor( 
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
     ){}
    async create(createUserDto: CreateUserDto) : Promise<User> {
        const { password, ...rest } = createUserDto;

        const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10

        const user = this.userRepo.create({
            ...rest,
            password: hashedPassword,
        });

        return await this.userRepo.save(user);
    }
}
