import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  private loggerInstance = new Logger('Common');

  handleErrors(error: any) {
    // Una llave única se repite
    if (error.code == '23505') throw new BadRequestException(error.detail);

    this.loggerInstance.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, hable con el administrador',
    );
  }
}
