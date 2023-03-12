/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PendingPaymentDocument = PendingPayment & Document;

@Schema()
export class PendingPayment {
    @Prop({ type: Object })
    data: any;
    @Prop({ type: String })
    payment_method: any;
    @Prop({ required: false, default: new Date() })
    date: Date;
}

export const PendingPaymentsSchema = SchemaFactory.createForClass(PendingPayment);
