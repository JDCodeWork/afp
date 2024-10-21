import { LoginUserDto } from '../auth/dto/login-user.dto';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from '../auth/entities/user.entity';

export const userEntityFixture: User = {
  id: '1',
  name: 'some name',
  email: 'some@email.test',
  password: 'hashedTestPassword',
};

export const userFixture = {
  id: '1',
  name: 'some name',
};

export const createUserFixture: CreateUserDto = {
  name: 'some name',
  email: 'some@email.test',
  password: 'TestPassword123',
};

export const loginUserFixture: LoginUserDto = {
  email: 'some@email.test',
  password: 'TestPassword123',
};

export const tokenResponseFixture = {
  token: 'someToken',
};
