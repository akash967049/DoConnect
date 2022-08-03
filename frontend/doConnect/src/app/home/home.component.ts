import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Feedback } from '../objects/Feedback';
import { IdData } from '../objects/iddata';
import { Question } from '../objects/question';
import { SearchData } from '../objects/searchdata';
import { AuthRouteGaurd } from '../shared/guards/auth.route.guards';
import { NotificationService } from '../shared/services/notification.service';
import { QaAdminService } from '../shared/services/qa.admin.service';
import { QaAllService } from '../shared/services/qa.all.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeQuestions!:Question[];
  feedback!: Feedback;

  searchInput: string = "";

  constructor(private qaAllService:QaAllService, private qaAdminService: QaAdminService, private notifyService: NotificationService, private authGuard: AuthRouteGaurd) { 
    this.loadHomeQuestion();
  }

  ngOnInit(): void {
    this.loadHomeQuestion();
  }

  deleteQues(question: Question){
    this.qaAdminService.deleteQuestion(new IdData(question.id)).subscribe(resp => {
      if(resp.body != null){
          this.feedback = resp.body;
          console.log(this.feedback.massage);
          this.notifyService.showInfo(this.feedback.massage, "");
          this.loadHomeQuestion();
      }
    });
  }

  loadHomeQuestion(){
    this.qaAllService.getQuestionByDescription(new SearchData(this.searchInput)).subscribe(resp => {
      if(resp.body!=null){
        this.homeQuestions = resp.body.questions;
        console.log(this.homeQuestions);
      }
    });
  }

  checkUserLogin(){
    return this.authGuard.checklogin();
  }

  loginSubmited(){

  }

  searchByDescription(searchText: string){
    this.searchInput = searchText;
    this.loadHomeQuestion();
  }

}
