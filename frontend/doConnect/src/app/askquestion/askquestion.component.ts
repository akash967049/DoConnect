import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateQuestionData } from '../objects/createquestiondata';
import { AuthService } from '../shared/services/auth.service';
import { QaUserService } from '../shared/services/qa.user.service';

@Component({
  selector: 'app-askquestion',
  templateUrl: './askquestion.component.html',
  styleUrls: ['./askquestion.component.css']
})
export class AskquestionComponent implements OnInit {

  constructor(private qaUserService:QaUserService, private route:Router) { }

  ngOnInit(): void {
  }

  askQuestionForm = new FormGroup({
    InputTopic: new FormControl("",[
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z]*")
    ]),
    InputDescription: new FormControl("",[
      Validators.required
    ])
  })

  askQuestionSubmited(){
    //console.log(this.loginForm.value);
    
    const topic = this.askQuestionForm.value.InputTopic;
    const description = this.askQuestionForm.value.InputDescription;
    if(topic !=null && description!=null){
      const createQuestion = new CreateQuestionData(description, topic);
      this.qaUserService.createQuestion(createQuestion);
    }else{
      console.log("Input are not valid for creating question");
    }
    
     
  }

  get InputTopic(){
    return this.askQuestionForm.get("InputTopic") as FormControl;
  }

  get InputDescription(){
    return this.askQuestionForm.get("InputDescription") as FormControl;
  }

}
