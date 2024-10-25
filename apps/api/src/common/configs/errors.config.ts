import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ErrorCodes as EC } from '../interfaces';

const config: Record<EC, new (message: string) => Error> = {
  [EC.KeyAlreadyExist]: BadRequestException,
  [EC.CredentialsNotValid]: UnauthorizedException,
  [EC.TokenNotValid]: UnauthorizedException,
  [EC.CategoryNotFound]: NotFoundException,
  [EC.TransactionNotFound]: NotFoundException,
  [EC.BudgetNotFound]: NotFoundException,
  [EC.GoalNotFound]: NotFoundException,
  [EC.UnauthorizedRequest]: ForbiddenException,
  [EC.FilterTransactionRequired]: BadRequestException,
  [EC.UnKnowException]: InternalServerErrorException,
};

export const getExceptionForErrorCode = (code: EC) => config[code];
