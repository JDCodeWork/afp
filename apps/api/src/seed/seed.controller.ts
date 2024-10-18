import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('/categories')
  insertCategories() {
    return this.seedService.createInitialCategories();
  }

  @Get('/users')
  insertUsers() {
    return this.seedService.createInitialUsers();
  }
}
