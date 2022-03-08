import { NewUserDto } from './dtos/new-user.dto';
import { UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: NewUserDto): Promise<NewUserDto> {
    const newUser = new this.userModel({ ...user });
    return await newUser.save();
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  _getUserDetails(user: UserDocument) {
    const { name, email, _id } = user;
    return { name, email, id: _id };
  }
}
