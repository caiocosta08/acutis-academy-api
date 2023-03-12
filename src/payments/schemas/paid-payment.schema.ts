/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaidPaymentDocument = PaidPayment & Document;

@Schema()
export class PaidPayment {
    @Prop({ type: Object })
    data: any;
    @Prop({ type: String })
    payment_method: any;
    @Prop({ required: false, default: new Date() })
    date: Date;
}

export const PaidPaymentsSchema = SchemaFactory.createForClass(PaidPayment);
