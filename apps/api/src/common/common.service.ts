import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCodes } from './interfaces/error-codes.interface';

@Injectable()
export class CommonService {
  private loggerInstance = new Logger('Common');

  handleErrors(error: { code: ErrorCodes; detail?: string }) {
    switch (error.code) {
      case ErrorCodes.KeyAlreadyExist:
        throw new BadRequestException(error.detail);
      case ErrorCodes.CredentialsNotValid:
        throw new UnauthorizedException('Las credenciales no son validas');
      case ErrorCodes.TokenNotValid:
        throw new UnauthorizedException('El token no es valido');
      case ErrorCodes.CategoryNotFound:
        throw new NotFoundException('La categoría no existe');
      default:
        this.loggerInstance.error(error);

        throw new InternalServerErrorException(
          'Error inesperado, hable con el administrador',
        );
    }
  }
}
