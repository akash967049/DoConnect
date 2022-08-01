import { Component, OnInit } from '@angular/core';
import { Message } from '../objects/message';
import { MessageRequest } from '../objects/messageRequest';
import { UserName } from '../objects/userName';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  recievers: string[];
  showRecievers: string[];
  reciever : string = null;
  messages: Message[];
  
  constructor(private chatService: ChatService) { 
    this.loadchatbox();
  }

  ngOnInit(): void {
    this.loadchatbox();
  }

  loadchatbox(){
    this.chatService.getUsersList().subscribe(resp => {
      if(resp.status === 200){
        this.recievers = resp.body.users;
        this.showRecievers = this.recievers;
      }
    });
  }

  showmessagepage(user: string){
    this.reciever = user;
    this.loadmessages();
  }

  loadmessages(){
    this.chatService.getChatHistory(new UserName(this.reciever)).subscribe(resp => {
      if(resp.status === 200){
        this.messages = resp.body.chatlist;
      }
    });
  }

  sendMessage(message: string){
    const messageRequest = new MessageRequest(this.reciever, message);
    this.chatService.sendMessage(messageRequest).subscribe(resp =>{
      if(resp.status == 200){
        this.loadmessages();
      }
    })

  }

  searchforusers(val: string){
    this.showRecievers= [];
    for(var per of this.recievers){
      const varlen = val.length;
      if(varlen<=per.length){
        if(val == per.substring(0, varlen)){
          this.showRecievers.push(per);
        }
      }
    }

  }

  goToUserListPage(){
    this.reciever = null;
    this.messages = null;
  }

  showUserList(){
    if(this.reciever == null){
      return true; 
    }else{
      return false;
    }
  }



}
