export class Message{
    message!:string;
    sender!:string;

    constructor(message: string, sender: string){
        this.message = message;
        this.sender = sender;
    }
}