import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Gender } from "src/common/enums/gender.enum";

@Schema()
export class Athlete extends Document{
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    location: string;

    @Prop({required: true})
    phoneNumber: string; // Changed to string to match form

    @Prop({unique: [true, 'Duplicate email entered']})
    email: string;

    @Prop()
    gender: Gender;

    @Prop({min: 1, max: 10})
    point: number;

    @Prop()
    image: string;
}

export const AthleteSchema = SchemaFactory.createForClass(Athlete);