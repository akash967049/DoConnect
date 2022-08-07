import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from '../objects/answer';
import { SearchData } from '../objects/searchdata';
import { QaAllService } from '../shared/services/qa.all.service';

@Component({
  selector: 'app-approveansweritem',
  templateUrl: './approveansweritem.component.html',
  styleUrls: ['./approveansweritem.component.css'],
  inputs: ['answer']
})
export class ApproveansweritemComponent implements OnInit {

  @Input() answer: Answer;
  @Output() approveAnswer: EventEmitter<Answer> = new EventEmitter();
  @Output() rejectAnswer: EventEmitter<Answer> = new EventEmitter();

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor( private qaAllService: QaAllService) {
    this.loadAnswerImage();
  }

  ngOnInit(): void {
    this.loadAnswerImage();
  }

  ngOnChanges(){
    this.loadAnswerImage();
  }

  // this emits event to parent for approval of answer

  approve(){
    this.approveAnswer.emit(this.answer);
  }

  // this emits event to parent for rejection of answer

  reject(){
    this.rejectAnswer.emit(this.answer);
  }

  // this loads image related to answer

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

}
