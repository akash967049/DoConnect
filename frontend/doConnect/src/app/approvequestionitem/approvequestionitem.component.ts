import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IdData } from '../objects/iddata';
import { Question } from '../objects/question';
import { QaAdminService } from '../shared/services/qa.admin.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-approvequestionitem',
  templateUrl: './approvequestionitem.component.html',
  styleUrls: ['./approvequestionitem.component.css']
})
export class ApprovequestionitemComponent implements OnInit {

  @Input() question!: Question;
  @Output() bookinfodata: EventEmitter<String> = new EventEmitter();

  constructor(private route:Router, private userService:UserService, private qaAdminService: QaAdminService) { }

  ngOnInit(): void {
  }

  approveQuestion(question :Question){
    this.qaAdminService.approveQuestion(new IdData(question.id));
  }

}
