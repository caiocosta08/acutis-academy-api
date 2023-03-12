/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from 'src/app.schema';
import { DatabaseModule } from 'src/database/database.module';
import { PaidPayment, PaidPaymentsSchema } from './schemas/paid-payment.schema';
import { PendingPayment, PendingPaymentsSchema } from './schemas/pending-payment.schema';

@Module({
  imports:
    [
      DatabaseModule,
      MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
      MongooseModule.forFeature([{ name: PaidPayment.name, schema: PaidPaymentsSchema }]),
      MongooseModule.forFeature([{ name: PendingPayment.name, schema: PendingPaymentsSchema }]),
      MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
      MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule { }
