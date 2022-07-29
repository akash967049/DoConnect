import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  users!:string[];

  alluser:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { 
    this.loadallusers();
  }

  ngOnInit(): void {
    this.loadallusers();
    this.alluser.next(this.users);
  }

  loadallusers(){
    const data = localStorage.getItem("allUsers");
    if(data!=null){
      this.users = JSON.parse(data);
    }
  }



}
