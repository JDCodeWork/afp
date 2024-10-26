import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ScheduledPaymentsService } from './scheduled-payments.service';
import { CreateScheduledPaymentDto } from './dto/create-scheduled-payment.dto';
import { UpdateScheduledPaymentDto } from './dto/update-scheduled-payment.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommonService } from '@/common/common.service';
import { GetUser } from '@/auth/decorators/get-user.decorator';
import { User } from '@/auth/entities/user.entity';

@Controller('scheduled-payments')
@UseGuards(AuthGuard())
export class ScheduledPaymentsController {
  constructor(
    private readonly scheduledPaymentsService: ScheduledPaymentsService,

    private readonly commonService: CommonService,
  ) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createScheduledPaymentDto: CreateScheduledPaymentDto,
  ) {
    return this.scheduledPaymentsService.create(
      createScheduledPaymentDto,
      user,
    );
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.scheduledPaymentsService.findAll(user);
  }

  @Get(':id')
  findOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.scheduledPaymentsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScheduledPaymentDto: UpdateScheduledPaymentDto,
  ) {
    return this.scheduledPaymentsService.update(
      id,
      updateScheduledPaymentDto,
      user,
    );
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.scheduledPaymentsService.remove(id, user);
  }
}
