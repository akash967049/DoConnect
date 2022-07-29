export class UserSignup {
    username!: any;
    firstName!: any;
    middleName!: any;
    lastName!: any;
    gender!: any;
    phone!: any;
    email!: any;
    password!: any;

    constructor(
        username: any,
        firstname: any,
        middlename: any,
        lastname: any,
        gender: any,
        mobile: any,
        email: any,
        password: any){
        this.username = username;
        this.firstName = firstname;
        this.middleName = middlename
        this.lastName = lastname;
        this.gender = gender;
        this.phone = mobile;
        this.email = email; 
        this.password = password;
    }

}
