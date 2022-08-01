import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Feedback } from "src/app/objects/Feedback";
import { MessageList } from "src/app/objects/messageList";
import { MessageRequest } from "src/app/objects/messageRequest";
import { UserList } from "src/app/objects/userList";
import { UserName } from "src/app/objects/userName";
import { MakeRequest } from "../request/make.request";


@Injectable()
export class ChatService{

    microservice = 3;
    basepath:string = "user/";
    feedback!:Feedback;
    userList!:UserList;
    chatList:MessageList;

    constructor(private http: HttpClient, private route:Router, private makeRequest: MakeRequest){}

    // send a message
    public sendMessage(message: MessageRequest){
        const path = this.basepath + "addchat";
        return this.makeRequest.postRequest(this.feedback, message, path, this.microservice);
    }

    // get list of all users

    public getUsersList(){

        const path = this.basepath + "getusers";
        return this.makeRequest.getRequest(this.userList, path, this.microservice);
    }

    // get chat history with a user

    public getChatHistory(userName: UserName){
        const path = this.basepath + "getchat";
        return this.makeRequest.postRequest(this.chatList, userName, path, this.microservice);

    }

}