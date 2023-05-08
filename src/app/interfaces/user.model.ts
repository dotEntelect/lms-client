import { Role } from "../constants/enums";

export interface IUserModel {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    cellPhone: string;
    role: Role;
    dateOfBirth: string;
}

export interface IRegistrationModel extends IUserModel {
    password: string;
}

export interface lLoginModel {
    emailAddress: string;
    password: string;
}

export interface ILoggedInUserState {
    userDetails: IUserModel;
    token: string;
}