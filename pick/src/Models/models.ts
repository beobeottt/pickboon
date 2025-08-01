import { Gender, Authenticate, Categories } from "./common";

export interface Athlete {
    name: string;
    location: string;
    phoneNumber: number;
    email: string;
    gender: Gender;
    image: string;
    levelPoint: number;
    authenticate: Authenticate;
}

export interface Tournment {
    name: string;
    location: string;
    date: Date;
    level: string;
    categories: Categories[];
    description?: string;
    banner?: string;
}