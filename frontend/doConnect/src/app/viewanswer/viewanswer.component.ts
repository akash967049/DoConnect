import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from '../objects/answer';
import { SearchData } from '../objects/searchdata';
import { AuthRouteGaurd } from '../shared/guards/auth.route.guards';
import { QaAllService } from '../shared/services/qa.all.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-viewanswer',
  templateUrl: './viewanswer.component.html',
  styleUrls: ['./viewanswer.component.css'],
  inputs:['answer']
})
export class ViewanswerComponent implements OnInit {

  @Input() answer!: Answer;
  @Output() deleteAns:  EventEmitter<Answer> = new EventEmitter();

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(private route:Router, private userService:UserService, private qaAllService: QaAllService, private authGuard: AuthRouteGaurd) {
    this.loadAnswerImage();
  }

  ngOnInit(): void {
    this.loadAnswerImage();
  }

  // Detact change in variable to render answer image

  ngOnChanges(){
    this.loadAnswerImage();
  }

  // Sends request for delete a answer

  deleteAnswer(){
    this.deleteAns.emit(this.answer);
  }

  // loads Image related to a answer

  loadAnswerImage(){
    if(this.answer){
      const imageName = "a"+ this.answer['id'];
      this.qaAllService.searchImage(new SearchData(imageName)).subscribe(resp =>{
        this.retrieveResonse = resp.body;
        this.base64Data = this.retrieveResonse.picByte;
        if(this.retrieveResonse.picByte != null){
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }else{
          this.retrievedImage = null;
        }
      });
    }
  }

  // Checks wether admin is logged in or not

  checkAdminLogin(){
    return (this.authGuard.checklogin() && this.authGuard.checkadmin());
  }

}
