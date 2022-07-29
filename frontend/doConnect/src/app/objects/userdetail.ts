import { first } from "rxjs";

export class UserDetail {
    username!: string;
    firstname!: string;
    middlename!: string;
    lastname!: string;
    gender!: string;
    phone!: string;
    email!: string;
    dateofbirth!: string;
    address!: string;

    constructor(username:string, firstname:string, middlename: string, lastname: string, gender: string, phone: string, email: string, dateofbirth: string, address: string){
        this.username = username;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.dateofbirth = dateofbirth;
        this.address = address;
    }
}