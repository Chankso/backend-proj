import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from './users/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user && user.user_pass === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user_pass, ...result } = user;

      return result;
    }
    if (!user)
      throw new HttpException(
        {
          code: 'FieldEmpty',
          message: 'User does not exist',
          target: 'user',
        },
        500,
      );
    return null;
  }

  async addUser(email: string, password: string) {
    if ((await this.userService.findOne(email)) == null) {
      return this.userService.addUser(email, password);
    }
    throw new HttpException(
      {
        code: 'FieldTaken',
        message: 'User with this email already exists',
      },
      500,
    );
  }

  async findOne(email: string) {
    return this.userService.findOne(email);
  }
}
