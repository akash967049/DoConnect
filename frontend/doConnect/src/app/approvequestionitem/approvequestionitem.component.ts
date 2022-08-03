import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IdData } from '../objects/iddata';
import { Question } from '../objects/question';
import { SearchData } from '../objects/searchdata';
import { QaAdminService } from '../shared/services/qa.admin.service';
import { QaAllService } from '../shared/services/qa.all.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-approvequestionitem',
  templateUrl: './approvequestionitem.component.html',
  styleUrls: ['./approvequestionitem.component.css'],
  inputs: ['question']
})
export class ApprovequestionitemComponent implements OnInit {

  @Input() question!: Question;
  @Output() approveQuestion: EventEmitter<Question> = new EventEmitter();
  @Output() rejectQuestion: EventEmitter<Question> = new EventEmitter();

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(private route:Router, private userService:UserService, private qaAdminService: QaAdminService, private qaAllService: QaAllService) {
    this.loadQuestionImage();
  }

  ngOnInit(): void {
    this.loadQuestionImage();
  }

  approve(){
    this.approveQuestion.emit(this.question);
  }

  reject(){
    this.rejectQuestion.emit(this.question);
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

}
