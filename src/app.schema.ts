import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop()
  event: string;
  @Prop({ type: Object })
  data: any;
  @Prop({ required: false, default: new Date() })
  date: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
