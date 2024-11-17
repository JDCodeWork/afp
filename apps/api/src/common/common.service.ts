import { Injectable, Logger, Scope } from '@nestjs/common';
import {} from '@nestjs/core';
import { ErrorCodes as EC } from './interfaces/error-codes.interface';
import { getExceptionForErrorCode } from './configs/errors.config';
import { MESSAGES } from './constants/error-message.constant';

@Injectable({ scope: Scope.REQUEST })
export class CommonService {
  private language: string;
  private logger = new Logger('Common');

  handleErrors(error: EC) {
    const ExceptionClass = getExceptionForErrorCode(error);

    if (ExceptionClass) {
      throw new ExceptionClass(
        CommonService.getErrorMessage(error, this.language),
      );
    } else {
      const UnKnowException = getExceptionForErrorCode(EC.UnKnowException);

      this.logger.error(error);
      throw new UnKnowException(
        CommonService.getErrorMessage(EC.UnKnowException, this.language),
      );
    }
  }

  static getErrorMessage(errorCode: EC, language: string = 'es'): string {
    const messages = MESSAGES[errorCode];

    return messages[language] || messages['es'];
  }

  setLanguage(language: string) {
    this.language = language;
  }
}
