import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { AuthRouteGaurd } from './shared/guards/auth.route.guards';
import { AuthService } from './shared/services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { MakeRequest } from './shared/request/make.request';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './shared/services/notification.service';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UserService } from './shared/services/user.service';
import { CommonInterceptor } from './common.interceptor';
import { AllusersComponent } from './allusers/allusers.component';
import { UserItemComponent } from './user-item/user-item.component';
import { QaAdminService } from './shared/services/qa.admin.service';
import { QaUserService } from './shared/services/qa.user.service';
import { QaAllService } from './shared/services/qa.all.service';
import { ViewquestionComponent } from './viewquestion/viewquestion.component';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { ViewanswerComponent } from './viewanswer/viewanswer.component';
import { GiveanswerComponent } from './giveanswer/giveanswer.component';
import { QuestionanswerComponent } from './questionanswer/questionanswer.component';
import { ApprovequestionComponent } from './approvequestion/approvequestion.component';
import { ApproveanswerComponent } from './approveanswer/approveanswer.component';
import { ApprovequestionitemComponent } from './approvequestionitem/approvequestionitem.component';
import { ApproveansweritemComponent } from './approveansweritem/approveansweritem.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './shared/services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavigationbarComponent,
    HomeComponent,
    LoaderComponent,
    UserinfoComponent,
    AllusersComponent,
    UserItemComponent,
    ViewquestionComponent,
    AskquestionComponent,
    ViewanswerComponent,
    GiveanswerComponent,
    QuestionanswerComponent,
    ApprovequestionComponent,
    ApproveanswerComponent,
    ApprovequestionitemComponent,
    ApproveansweritemComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: [AuthService,
    AuthRouteGaurd,
    MakeRequest,
    NotificationService,
    UserService,
    QaAdminService,
    QaUserService,
    QaAllService,
    ChatService,
    {provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
