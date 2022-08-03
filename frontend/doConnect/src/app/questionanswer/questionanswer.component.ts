import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Answer } from '../objects/answer';
import { Feedback } from '../objects/Feedback';
import { IdData } from '../objects/iddata';
import { Question } from '../objects/question';
import { SearchData } from '../objects/searchdata';
import { NotificationService } from '../shared/services/notification.service';
import { QaAdminService } from '../shared/services/qa.admin.service';
import { QaAllService } from '../shared/services/qa.all.service';
import { QaUserService } from '../shared/services/qa.user.service';

@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.css']
})
export class QuestionanswerComponent implements OnInit {

  question!:Question;

  answers!: Answer[];
  feedback!: Feedback;

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;


  constructor(private qaUserService: QaUserService, private route: ActivatedRoute, private router: Router, private qaAllService: QaAllService, private qaAdminService: QaAdminService, private notifyService: NotificationService) { this.loadQuestionAnswer();}

  ngOnInit(): void {
    this.loadQuestionAnswer;
  }

  loadQuestionAnswer(){
    this.question = this.router.getCurrentNavigation().extras.state['data'];
    console.log(this.question);
    this.loadQuestionImage();
    this.loadAnswers(this.question.id);
  }

  loadAnswers(questionId : number){
    this.qaUserService.getAnswerByQuestionId(new IdData(questionId)).subscribe(resp => {
      if(resp.body != null){
        this.answers = resp.body.answers;
        console.log(this.answers);
      }
    });
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

  deleteAns(answer: Answer){
    this.qaAdminService.deleteAnswer(new IdData(answer.id)).subscribe(resp => {
      if(resp.body != null){
          this.feedback = resp.body;
          console.log(this.feedback.massage);
          this.notifyService.showInfo(this.feedback.massage, "");
          this.loadAnswers(this.question.id);
      }
    });
  }

}
