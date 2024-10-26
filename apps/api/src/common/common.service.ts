import { Injectable, Logger } from '@nestjs/common';
import { ErrorCodes as EC } from './interfaces/error-codes.interface';
import { getExceptionForErrorCode } from './configs/errors.config';
import { MESSAGES } from './constants/error-message.constant';

@Injectable()
export class CommonService {
  private logger = new Logger('Common');

  handleErrors(error: EC, language?: string) {
    const ExceptionClass = getExceptionForErrorCode(error);

    if (ExceptionClass) {
      throw new ExceptionClass(this.getErrorMessage(error, language));
    } else {
      const UnKnowException = getExceptionForErrorCode(EC.UnKnowException);

      this.logger.error(error);
      throw new UnKnowException(
        this.getErrorMessage(EC.UnKnowException, language),
      );
    }
  }

  private getErrorMessage(errorCode: EC, language: string = 'es'): string {
    const messages = MESSAGES[errorCode];

    return messages[language] || messages['es'];
  }
}