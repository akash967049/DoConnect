import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer } from '../objects/answer';

@Component({
  selector: 'app-approveanswer',
  templateUrl: './approveanswer.component.html',
  styleUrls: ['./approveanswer.component.css']
})
export class ApproveanswerComponent implements OnInit {

  approveanswers!:Answer[];

  allapproveanswers:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { 
    this.loadAllUnapprovedAnswers();
  }

  ngOnInit(): void {
    this.loadAllUnapprovedAnswers();
    
  }

  loadAllUnapprovedAnswers(){
    const data = localStorage.getItem("unapprovedanswers");
    if(data!=null){
      this.approveanswers = JSON.parse(data);
      this.allapproveanswers.next(this.approveanswers);
    }
  }

}
