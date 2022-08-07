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

  homeQuestions:Question[] = [];
  feedback!: Feedback;

  searchInput: string = "";
  java: string = "java";
  angular: string = "angular";
  python:string = "python";
  database: string = "database";
  javascript: string = "javascript";

  constructor(private qaAllService:QaAllService, private qaAdminService: QaAdminService, private notifyService: NotificationService, private authGuard: AuthRouteGaurd) {
  }

  ngOnInit(): void {
    this.loadHomeQuestion();
  }

  // Method to delete question

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

  // method to list question to be shown on home page

  loadHomeQuestion(){
    this.qaAllService.getQuestionByDescription(new SearchData(this.searchInput)).subscribe(resp => {
      if(resp.body!=null){
        this.homeQuestions = resp.body.questions;
        console.log(this.homeQuestions);
      }
    });
  }

  // Search Question by Topic

  loadhomeQuestionByTopic(topic: string){
    this.qaAllService.getQuestionByTopic(new SearchData(topic)).subscribe(resp => {
      if(resp.body!=null){
        this.homeQuestions = resp.body.questions;
        console.log(this.homeQuestions);
      }
    });
  }

  // Checks that wether admin is logged in or not

  checkAdminLogin(){
    return (this.authGuard.checklogin() && this.authGuard.checkadmin());
  }

  // Checks wether user is logged in or not

  checkUserLogin(){
    return this.authGuard.checklogin();
  }

  // Search Question By Discription

  searchByDescription(searchText: string){
    this.searchInput = searchText;
    this.loadHomeQuestion();
  }

  // Checks wether homeQuestion list is empty or not

  QuestionFound(){
    if(this.homeQuestions.length==0){
      return false;
    }
    return true;
  }

}
