export class MessageRequest{
    username!: string;
    message!: string;

    constructor(username: string, message: string){
        this.message = message;
        this.username = username;
    }
}