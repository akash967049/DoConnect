import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../objects/question';
import { SearchData } from '../objects/searchdata';
import { QaAllService } from '../shared/services/qa.all.service';

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

  constructor( private qaAllService: QaAllService) {
    this.loadQuestionImage();
  }

  ngOnInit(): void {
    this.loadQuestionImage();
  }

  // this emits event to parent for approval of question

  approve(){
    this.approveQuestion.emit(this.question);
  }

  // this emits event to parent for rejection of question

  reject(){
    this.rejectQuestion.emit(this.question);
  }

  // this loads image related to this question

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
