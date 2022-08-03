import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from '../objects/answer';
import { IdData } from '../objects/iddata';
import { SearchData } from '../objects/searchdata';
import { QaAdminService } from '../shared/services/qa.admin.service';
import { QaAllService } from '../shared/services/qa.all.service';
import { UserService } from '../shared/services/user.service';

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

  constructor(private route:Router, private userService:UserService, private qaAdminService: QaAdminService, private qaAllService: QaAllService) {
    this.loadAnswerImage();
  }

  ngOnInit(): void {
    this.loadAnswerImage();
  }

  ngOnChanges(){
    this.loadAnswerImage();
  }

  approve(){
    // this.qaAdminService.approveAnswer(new IdData(this.answer.id));
    this.approveAnswer.emit(this.answer);
  }

  reject(){
    this.rejectAnswer.emit(this.answer);
  }

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
