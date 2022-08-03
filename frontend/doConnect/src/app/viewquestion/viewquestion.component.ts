import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IdData } from '../objects/iddata';
import { Question } from '../objects/question';
import { SearchData } from '../objects/searchdata';
import { AuthRouteGaurd } from '../shared/guards/auth.route.guards';
import { QaAllService } from '../shared/services/qa.all.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css'],
  inputs: ['question']
})
export class ViewquestionComponent implements OnInit {

  @Input() question!: Question;
  @Output() deleteQues:  EventEmitter<Question> = new EventEmitter();

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(private route:Router, private userService:UserService, private qaAllService: QaAllService, private authGuard: AuthRouteGaurd) { this.loadQuestionImage();
  }

  ngOnInit(): void {
    this.loadQuestionImage();
  }

  ngOnChanges(){
    this.loadQuestionImage();
  }

  seeAnswers(){
    this.route.navigate(['/questionanswer'], {state :{data: this.question}});
  }

  deleteQuestion(){
    this.deleteQues.emit(this.question);
  }

  loadQuestionImage(){
    if(this.question){
      const imageName = "q"+ this.question['id'];
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

  checkAdminLogin(){
    return (this.authGuard.checklogin() && this.authGuard.checkadmin());
  }

  checkUserLogin(){
    return this.authGuard.checklogin();
  }

}
