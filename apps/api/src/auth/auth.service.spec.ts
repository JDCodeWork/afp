import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { CommonService } from '../common/common.service';
import { UsersService } from '../users/users.service';
import {
  createUserFixture,
  loginUserFixture,
  tokenResponseFixture,
  userEntityFixture,
  userFixture,
} from '../__fixtures__/auth.fixture';

import { ErrorMessages } from '../common/interfaces/error-messges.interface';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUsersService = {
    create: jest.fn(),
    findOneByEmail: jest.fn(),
  };
  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        CommonService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should be successful register', async () => {
    jest.spyOn(mockUsersService, 'create').mockResolvedValue(userFixture);
    jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedTestPassword');
    jest
      .spyOn(mockJwtService, 'sign')
      .mockReturnValue(tokenResponseFixture.token);

    await expect(authService.register(createUserFixture)).resolves.toEqual({
      user: userFixture,
      ...tokenResponseFixture,
    });
  });

  it('should be successful login', async () => {
    jest
      .spyOn(mockUsersService, 'findOneByEmail')
      .mockResolvedValue(userFixture);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    jest
      .spyOn(mockJwtService, 'sign')
      .mockReturnValue(tokenResponseFixture.token);

    await expect(authService.login(loginUserFixture)).resolves.toEqual({
      name: userFixture.name,
      ...tokenResponseFixture,
    });
  });

  it('should be unsuccessful login by user', async () => {
    jest.spyOn(mockUsersService, 'findOneByEmail').mockResolvedValue(null);

    await expect(authService.login(loginUserFixture)).rejects.toThrow(
      ErrorMessages.CredentialsNotValid,
    );
  });

  it('should be unsuccessful login by password', async () => {
    jest
      .spyOn(mockUsersService, 'findOneByEmail')
      .mockResolvedValue(userEntityFixture);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

    await expect(authService.login(loginUserFixture)).rejects.toThrow(
      ErrorMessages.CredentialsNotValid,
    );
  });
});
