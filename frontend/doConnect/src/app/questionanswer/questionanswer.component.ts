import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer } from '../objects/answer';
import { Question } from '../objects/question';

@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.css']
})
export class QuestionanswerComponent implements OnInit {

  question!:Question;
  answers!:Answer[];


  constructor() { this.loadQuestionAnswer();}

  ngOnInit(): void {
    this.loadQuestionAnswer;
    
    console.log(this.answers);
  }

  loadQuestionAnswer(){
    const answersData = localStorage.getItem("currentanswer");
    const questionData = localStorage.getItem("currentquestion");
    if(answersData!=null){
      this.answers = JSON.parse(answersData); 
      console.log(this.answers);
      
    }
    if(questionData != null){
      this.question = JSON.parse(questionData);
      console.log(this.question);
    }

  }

}
