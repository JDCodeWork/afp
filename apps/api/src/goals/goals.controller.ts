import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@/auth/decorators/get-user.decorator';
import { User } from '@/auth/entities/user.entity';

@Controller('goals')
@UseGuards(AuthGuard())
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@GetUser() user: User, @Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.goalsService.findAll();
  }

  @Get(':id')
  findOne(@GetUser() user: User, @Param('id') id: string) {
    return this.goalsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    return this.goalsService.update(+id, updateGoalDto);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.goalsService.remove(+id);
  }
}
