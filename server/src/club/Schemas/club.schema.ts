import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Club extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({required: true})
  location: string;

  @Prop({required: true, min: 0})
  members: number;

  @Prop({required: true})
  logo: string;
}

export const ClubSchema = SchemaFactory.createForClass(Club);
