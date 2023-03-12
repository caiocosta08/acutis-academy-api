import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CourseDocument = Course & Document;

@Schema({ collection: "courses" })
export class Course {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: false })
  time?: string;
  @Prop({ required: true })
  site_url?: string;
  @Prop({ required: true })
  price: number;
  // @Prop({ required: true })
  // modules: array;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
