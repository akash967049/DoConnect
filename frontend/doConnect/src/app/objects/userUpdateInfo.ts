import { Name } from "./name";

export class UserUpdateInfo{
    nameRequest: Name = new Name("","","");
    username: string = "";
    value:string = "";

    constructor(name:Name, username:string, value:string){
        this.nameRequest = name;
        this.username = username;
        this.value = value;
    }
}