import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllusersComponent } from './allusers/allusers.component';
import { ApproveanswerComponent } from './approveanswer/approveanswer.component';
import { ApprovequestionComponent } from './approvequestion/approvequestion.component';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { QuestionanswerComponent } from './questionanswer/questionanswer.component';
import { AuthRouteGaurd } from './shared/guards/auth.route.guards';
import { SignupComponent } from './signup/signup.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'loader', component:LoaderComponent},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent, canActivate: [AuthRouteGaurd]},
  {path: 'signup', component:SignupComponent, canActivate: [AuthRouteGaurd]},
  {path: 'userinfo', component:UserinfoComponent, canActivate: [AuthRouteGaurd]},
  {path: 'allusers', component:AllusersComponent, canActivate: [AuthRouteGaurd]},
  {path: 'askquestion', component:AskquestionComponent, canActivate:[AuthRouteGaurd]},
  {path: 'approvequestion', component:ApprovequestionComponent, canActivate:[AuthRouteGaurd]},
  {path: 'approveanswer', component:ApproveanswerComponent, canActivate:[AuthRouteGaurd]},
  {path: 'questionanswer', component:QuestionanswerComponent, canActivate: [AuthRouteGaurd]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
