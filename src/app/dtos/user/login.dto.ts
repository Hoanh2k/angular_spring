import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsDate
} from 'class-validator';

export class LoginDTO {
    @IsPhoneNumber()
    phone_number: String

    @IsString()
    @IsNotEmpty()
    password: String

    // role_id: number;

    constructor(data: any) {
        this.phone_number = data.phone_number;
        this.password = data.password;
        // this.role_id = data.role_id
    }

}