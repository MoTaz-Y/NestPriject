import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/Schema/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login({ email, password }) {
    {
      if (!email || !password) {
        throw new Error('Invalid credentials');
      }
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const match = await bcrypt.compare(password, user.password);
      if (user && match) {
        const token = this.jwtService.sign({ id: user._id,  });
        user.token = token;
        await user.save();
        return user;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    }
  }
}
