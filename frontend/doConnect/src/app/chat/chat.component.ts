import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  showRecievers: string[] = [];
  reciever : string = null;
  messages: Message[];
  target: HTMLElement;
  sendMessageContent: string="";
  
  constructor(private chatService: ChatService, private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadchatbox();
    
  }

  // Load user to which user can chat

  loadchatbox(){
    this.chatService.getUsersList().subscribe(resp => {
      if(resp.status === 200){
        this.recievers = resp.body.users;
        this.showRecievers = this.recievers;
      }
    });
  }

  // load message history from between two users

  showmessagepage(user: string){
    this.reciever = user;
    this.loadmessages();
  }

  // load message history from between two users
  
  loadmessages(){
    this.chatService.getChatHistory(new UserName(this.reciever)).subscribe(resp => {
      if(resp.status === 200){
        this.messages = resp.body.chatlist;
      }
    });
  }

  // Send a request to add message to chat table

  sendMessage(message: string, target: HTMLElement){
    const messageRequest = new MessageRequest(this.reciever, message);
    this.chatService.sendMessage(messageRequest).subscribe(resp =>{
      if(resp.status == 200){
        this.loadmessages();
        this.sendMessageContent = "";
      }
    });
  }

  // Scrolling function show that user see last message 

  scrollToLastMesage() {
    console.log("scrollto last message");
    this.target = document.getElementById("target");
    this.target.scrollIntoView({behavior: 'smooth',block: "start",
    inline: "nearest"});
    // this.router.navigate([], { fragment: "target" });
  }

  // Search for new userlist according to search box

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

  // Method to go to userlistpage

  goToUserListPage(){
    this.reciever = null;
    this.messages = null;
  }

  // method to check which page should be displayed

  showUserList(){
    if(this.reciever == null){
      return true; 
    }else{
      return false;
    }
  }

  // used for checking condition that who send a particular message

  userIsSender(sender: string){
    if(sender == this.reciever){
      return false;
    }
    return true;
  }


  ngAfterContentChecked() {
    this.cdref.detectChanges();
    
     }


}
