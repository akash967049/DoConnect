import { Message } from "./message";

export class MessageList{
    chatList: Message[];

    constructor(chatList: Message[]){
        this.chatList = chatList;
    }
}