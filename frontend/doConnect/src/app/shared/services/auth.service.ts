import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserSignup } from 'src/app/objects/usersignup';
import { Router } from '@angular/router';
import { MakeRequest } from '../request/make.request';
import { Feedback } from 'src/app/objects/Feedback';
import { NotificationService } from './notification.service';

@Injectable()
export class AuthService {

    microservice=1;
    
    userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
    role: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http: HttpClient, private route:Router, private makeRequest: MakeRequest, private notifyService:NotificationService){
        this.loadUserInfo();
    }

    // Auto signin when acces_token is already present in local storage

    loadUserInfo(){
        const userData = this.userInfo.getValue();
        if(!userData){
            const acces_token = localStorage.getItem("acces_token");
            const role = localStorage.getItem("role");
            if(acces_token!=null && role!=null){
                const data = JSON.parse(acces_token);
                this.userInfo.next(data);
                const roledata = role;
                this.role.next(roledata)
            }  
        }
    }

    // To get user logged in

    userLogin(username: any, password: any){
        console.log(username,password);
        const data = {
            username: username,
            password: password
        };
        var feedback : Feedback = {
            massage: "admin Successfully Logged In"
        };
        this.makeRequest.postRequest(feedback, data, "all/usersignin", this.microservice)
        .subscribe(resp => {

            if((resp.body?.massage == "admin Successfully Logged In") && (resp.headers.get("Authorization") != null)){
                const acces_token = resp.headers.get("Authorization");
                this.userInfo.next(acces_token);
                this.role.next("admin");
                localStorage.setItem("acces_token", JSON.stringify(acces_token));
                localStorage.setItem("role","admin");
                this.route.navigate(["/home"]);
                this.notifyService.showSuccess("You are logged in succefully","Welcome");
            }else if((resp.body?.massage == "user Successfully Logged In") && (resp.headers.get("Authorization") != null)){
                const acces_token = resp.headers.get("Authorization");
                this.userInfo.next(acces_token);
                this.role.next("user");
                localStorage.setItem("acces_token", JSON.stringify(acces_token));
                localStorage.setItem("role","user");
                this.route.navigate(["/home"]);
                this.notifyService.showSuccess("You are logged in succefully","Welcome");
            }else{
                this.route.navigate(['/login']);
                console.log("Wrong credential");
            }
            
            
        });
        console.log("but it is after request");

    }

    userregister(userSignup: UserSignup){
        console.log(userSignup);
        var feedback : Feedback = {
            massage: "Account created succesfully"
        };
        this.makeRequest.postRequest(feedback, userSignup, "all/usersignup", this.microservice)
        .subscribe(resp => {

            if((resp.body?.massage == "Account created succesfully")){
                this.notifyService.showSuccess(feedback.massage, "");
                this.userLogin(userSignup.username, userSignup.password);
                this.notifyService.showInfo("Now Sigining you in", "");
            }else{
                this.route.navigate(['/login']);
                console.log("Wrong credential");
            }    
        });
        console.log("but it is after request");
    }

    logout(){
        console.log("Logout clicked");
        this.route.navigate(['/home']);
        localStorage.clear();
        this.userInfo.next(null);
        
        
    } 
}