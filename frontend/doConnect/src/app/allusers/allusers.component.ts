import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  users:string[] = [];

  constructor() { 
    this.loadallusers();
  }

  // Runs whenever this component is called

  ngOnInit(): void {
    this.loadallusers();
  }

  // Load User Details from localstorage

  loadallusers(){
    const data = localStorage.getItem("allUsers");
    if(data!=null){
      this.users = JSON.parse(data);
    }
  }



}
