import { Component, OnInit } from '@angular/core';
import { Answer } from '../objects/answer';
import { Feedback } from '../objects/Feedback';
import { IdData } from '../objects/iddata';
import { NotificationService } from '../shared/services/notification.service';
import { QaAdminService } from '../shared/services/qa.admin.service';

@Component({
  selector: 'app-approveanswer',
  templateUrl: './approveanswer.component.html',
  styleUrls: ['./approveanswer.component.css']
})
export class ApproveanswerComponent implements OnInit {

  approveanswers:Answer[] = [];

  feedback!: Feedback;

  constructor(private qaAdminService: QaAdminService, private notifyService: NotificationService) { 
    this.loadAllUnapprovedAnswers();
  }

  ngOnInit(): void {
    this.loadAllUnapprovedAnswers();
  }

  // Loads all unapproved answer from backend

  loadAllUnapprovedAnswers(){
    this.qaAdminService.getUnapprovedAnswers().subscribe( resp => {
      if(resp.body != null){
          this.approveanswers = resp.body.answers;
          console.log(this.approveanswers);
      }
    });
  }

  // It sends request to backend for approving an answer

  approveAnswer(answer: Answer){
    this.qaAdminService.approveAnswer(new IdData(answer.id)).subscribe(resp => {
      if(resp.body != null){
        this.feedback = resp.body;
        console.log(this.feedback.massage);
        this.notifyService.showSuccess(this.feedback.massage, "");
        this.loadAllUnapprovedAnswers();
      }
    });
  }

  // It sends request to backend for rejecting an answer
  
  rejectAnswer(answer: Answer){
    this.qaAdminService.deleteAnswer(new IdData(answer.id)).subscribe(resp => {
      if(resp.body != null){
          this.feedback = resp.body;
          console.log(this.feedback.massage);
          this.notifyService.showInfo(this.feedback.massage, "");
          this.loadAllUnapprovedAnswers();
      }
    });
  }

}
