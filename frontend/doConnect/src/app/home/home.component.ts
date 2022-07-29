import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../objects/question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homequestions!:Question[];

  allhomequestions:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { 
    this.loadAllHomeQuestion();
  }

  ngOnInit(): void {
    this.loadAllHomeQuestion();
    this.allhomequestions.next(this.homequestions);
  }

  loadAllHomeQuestion(){
    const data = localStorage.getItem("homequestions");
    if(data!=null){
      this.homequestions = JSON.parse(data);
    }
  }

}
