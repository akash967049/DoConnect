import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../objects/question';

@Component({
  selector: 'app-approvequestion',
  templateUrl: './approvequestion.component.html',
  styleUrls: ['./approvequestion.component.css']
})
export class ApprovequestionComponent implements OnInit {

  approvequestions!:Question[];

  allapprovequestions:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { 
    this.loadAllUnapprovedQuestion();
  }

  ngOnInit(): void {
    this.loadAllUnapprovedQuestion();
    this.allapprovequestions.next(this.approvequestions);
  }

  loadAllUnapprovedQuestion(){
    const data = localStorage.getItem("unapprovedquestions");
    if(data!=null){
      this.approvequestions = JSON.parse(data);
    }
  }

}
