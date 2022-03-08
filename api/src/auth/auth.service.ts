import { UserDocument } from './../user/user.schema';
import { ExistingUserDto, NewUserDto } from './../user/dtos/new-user.dto';
import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: Readonly<NewUserDto>) {
    const { name, email, password } = user;

    const existingUser = await this.userService.findOneByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = (await this.userService.create({
      name,
      email,
      password: hashedPassword,
    })) as UserDocument;

    return this.userService._getUserDetails(newUser);
  }

  async login(existingUser: ExistingUserDto): Promise<{ token: string }> {
    const { email, password } = existingUser;

    const user = await this.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({ user });

    return { token };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) return null;

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return { isValid: false };
    }

    return this.userService._getUserDetails(user);
  }
}
