import { Gender } from "src/common/enums/gender.enum";

export class CreateAthleteDto {
    name: string;
    phoneNumber: string;
    email: string;
    gender: Gender;
    location: string;
    point: number;
    image?: string;
}