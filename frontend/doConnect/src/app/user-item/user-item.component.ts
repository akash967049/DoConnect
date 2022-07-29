import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserName } from '../objects/userName';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user!: string;
  @Output() bookinfodata: EventEmitter<String> = new EventEmitter();

  constructor(private route:Router, private userService:UserService) { }

  ngOnInit(): void {
  }

  goToUserinfo(user :String){
    const userName:UserName = new UserName(this.user);
    this.userService.getUserDetails(userName);
  }

}
