import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAnswerData } from '../objects/createanswerdata';
import { Question } from '../objects/question';
import { QaUserService } from '../shared/services/qa.user.service';

@Component({
  selector: 'app-giveanswer',
  templateUrl: './giveanswer.component.html',
  styleUrls: ['./giveanswer.component.css']
})
export class GiveanswerComponent implements OnInit {

  @Input() question!: Question;

  constructor(private qaUserService:QaUserService, private route:Router) { }

  ngOnInit(): void {
  }

  giveAnswerForm = new FormGroup({
    InputDescription: new FormControl("",[
      Validators.required
    ])
  })

  giveAnswerSubmited(){
    const description = this.giveAnswerForm.value.InputDescription;
    if(description!=null){
      const createAnswer = new CreateAnswerData(description, this.question.id);
      this.qaUserService.createAnswer(createAnswer);
    }else{
      console.log("Input are not valid for creating question");
    } 
  }

  get InputDescription(){
    return this.giveAnswerForm.get("InputDescription") as FormControl;
  }

}
