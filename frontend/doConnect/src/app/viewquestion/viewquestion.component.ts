import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IdData } from '../objects/iddata';
import { Question } from '../objects/question';
import { QaUserService } from '../shared/services/qa.user.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {

  @Input() question!: Question;
  @Output() bookinfodata: EventEmitter<String> = new EventEmitter();

  constructor(private route:Router, private userService:UserService, private qaUserService: QaUserService) { }

  ngOnInit(): void {
  }

  seeAnswers(){
    localStorage.setItem("currentquestion", JSON.stringify(this.question));
    this.qaUserService.getAnswerByQuestionId(new IdData(this.question.id));
  }

}
