import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LessonDocument = Lesson & Document;

@Schema({ collection: "lessons" })
export class Lesson {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  course_id: string;
  @Prop({ required: true })
  module_id: string;
  @Prop({ required: true })
  video_url: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
