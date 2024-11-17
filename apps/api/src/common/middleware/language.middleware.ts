import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CommonService } from '../common.service';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  constructor(private readonly commonService: CommonService) {}

  use(req: Request, _: Response, next: NextFunction) {
    const language = req.headers['accept-language'] || 'es';

    this.commonService.setLanguage(language);

    next();
  }
}
