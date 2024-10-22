import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser } from './DTO/createUser.dto';
import { v4 as uuid } from 'uuid';
import { UpdateUser } from './DTO/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schema/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // users: CreateUser[] = [];

  async findAll(): Promise<CreateUser[]> {
    const users = await this.userModel.find();

    return users;
  }

  async findOne(id: string): Promise<CreateUser> {
    return await this.userModel.findById(id);
  }

  async create(userData: CreateUser): Promise<CreateUser> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPassword;
      return await this.userModel.create(userData);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async update(id: string, updatedUser: UpdateUser): Promise<CreateUser> {
    return await this.userModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id);
  }
}
