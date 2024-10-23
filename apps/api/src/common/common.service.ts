import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCodes } from './interfaces/error-codes.interface';
import { ErrorMessages } from './interfaces/error-messges.interface';

@Injectable()
export class CommonService {
  private loggerInstance = new Logger('Common');

  handleErrors(error: ErrorCodes) {
    switch (error) {
      case ErrorCodes.KeyAlreadyExist:
        throw new BadRequestException(ErrorMessages.KeyAlreadyExist);
      case ErrorCodes.CredentialsNotValid:
        throw new UnauthorizedException(ErrorMessages.CredentialsNotValid);
      case ErrorCodes.TokenNotValid:
        throw new UnauthorizedException(ErrorMessages.TokenNotValid);
      case ErrorCodes.CategoryNotFound:
        throw new NotFoundException(ErrorMessages.CategoryNotFound);
      case ErrorCodes.TransactionNotFound:
        throw new NotFoundException(ErrorMessages.TransactionNotFound);
      case ErrorCodes.BudgetNotFound:
        throw new NotFoundException(ErrorMessages.BudgetNotFound);
      case ErrorCodes.GoalNotFound:
        throw new NotFoundException(ErrorMessages.GoalNotFound);
      case ErrorCodes.UnauthorizedRequest:
        throw new ForbiddenException(ErrorMessages.UnauthorizedRequest);
      case ErrorCodes.FilterTransactionRequired:
        throw new BadRequestException(ErrorMessages.FilterTransactionRequired);
      default:
        this.loggerInstance.error(error);

        throw new InternalServerErrorException(
          'Error inesperado, hable con el administrador',
        );
    }
  }
}
