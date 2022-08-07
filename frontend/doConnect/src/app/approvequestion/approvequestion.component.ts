import { Component, OnInit } from '@angular/core';
import { Feedback } from '../objects/Feedback';
import { IdData } from '../objects/iddata';
import { Question } from '../objects/question';
import { NotificationService } from '../shared/services/notification.service';
import { QaAdminService } from '../shared/services/qa.admin.service';

@Component({
  selector: 'app-approvequestion',
  templateUrl: './approvequestion.component.html',
  styleUrls: ['./approvequestion.component.css']
})
export class ApprovequestionComponent implements OnInit {

  approvequestions:Question[] = [];

  feedback!:Feedback;

  constructor(private qaAdminService: QaAdminService, private notifyService: NotificationService) { 
    this.loadAllUnapprovedQuestion();
  }

  ngOnInit(): void {
    this.loadAllUnapprovedQuestion();
  }

  // Loads all unapproved question from backend

  loadAllUnapprovedQuestion(){
    this.qaAdminService.getUnapprovedQuestions().subscribe( resp => {
      if(resp.body != null){
          this.approvequestions = resp.body.questions;
          console.log(this.approvequestions);
      }
    });
  }

  // It sends request to backend for approving an question

  approveQuestion(question : Question){
    this.qaAdminService.approveQuestion(new IdData(question.id)).subscribe(resp => {
      if(resp.body != null){
          this.feedback = resp.body;
          console.log(this.feedback.massage);
          this.notifyService.showSuccess(this.feedback.massage, "");
          this.loadAllUnapprovedQuestion();
      }
  });
  }

  // It sends request to backend for rejecting an question

  rejectQuestion(question : Question){
    this.qaAdminService.deleteQuestion(new IdData(question.id)).subscribe(resp => {
      if(resp.body != null){
          this.feedback = resp.body;
          console.log(this.feedback.massage);
          this.notifyService.showInfo(this.feedback.massage, "");
          this.loadAllUnapprovedQuestion();
      }
    });
  }

}
