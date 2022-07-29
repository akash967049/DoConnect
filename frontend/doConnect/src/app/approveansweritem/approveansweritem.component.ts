import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from '../objects/answer';
import { IdData } from '../objects/iddata';
import { QaAdminService } from '../shared/services/qa.admin.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-approveansweritem',
  templateUrl: './approveansweritem.component.html',
  styleUrls: ['./approveansweritem.component.css']
})
export class ApproveansweritemComponent implements OnInit {

  @Input() answer!: Answer;

  constructor(private route:Router, private userService:UserService, private qaAdminService: QaAdminService) { }

  ngOnInit(): void {
  }

  approveAnswer(answer :Answer){
    this.qaAdminService.approveAnswer(new IdData(answer.id));
  }

}
