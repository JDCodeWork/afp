import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduledPaymentDto } from './create-scheduled-payment.dto';

export class UpdateScheduledPaymentDto extends PartialType(CreateScheduledPaymentDto) {}
