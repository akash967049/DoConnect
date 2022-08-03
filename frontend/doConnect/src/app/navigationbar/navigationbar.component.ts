import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SearchData } from '../objects/searchdata';
import { UserName } from '../objects/userName';
import { AuthRouteGaurd } from '../shared/guards/auth.route.guards';
import { AuthService } from '../shared/services/auth.service';
import { QaAdminService } from '../shared/services/qa.admin.service';
import { QaAllService } from '../shared/services/qa.all.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  constructor(public authRoute:AuthRouteGaurd, public authService: AuthService, public userService:UserService, public route: Router, public qaAdminService: QaAdminService, public qaAllService: QaAllService) { }

  ngOnInit(): void {
  }

  

  gotouserinfo(){
    this.userService.getUserDetails(new UserName("user"))
  }

  goToAskQuestion(){
    this.route.navigate(["/askquestion"]);
  }

  goToApproveQuestion(){
    this.qaAdminService.getUnapprovedQuestions();
  }

  goToApproveAnswer(){
    this.qaAdminService.getUnapprovedAnswers();
  }

}
