import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from '../objects/answer';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-viewanswer',
  templateUrl: './viewanswer.component.html',
  styleUrls: ['./viewanswer.component.css']
})
export class ViewanswerComponent implements OnInit {

  @Input() answer!: Answer;
  @Output() bookinfodata: EventEmitter<String> = new EventEmitter();

  constructor(private route:Router, private userService:UserService) { }

  ngOnInit(): void {
  }

}
