import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AllUsers } from "src/app/objects/allusers";
import { Feedback } from "src/app/objects/Feedback";
import { UserDetail } from "src/app/objects/userdetail";
import { UserName } from "src/app/objects/userName";
import { UserUpdateInfo } from "src/app/objects/userUpdateInfo";
import { AuthRouteGaurd } from "../guards/auth.route.guards";
import { MakeRequest } from "../request/make.request";
import { AuthService } from "./auth.service";
import { NotificationService } from "./notification.service";


@Injectable()
export class UserService{

    microservice=1;

    userDetail!:UserDetail;
    allUsers!:AllUsers;

    constructor(private http: HttpClient, private route:Router, private makeRequest: MakeRequest, private notifyService:NotificationService, private authService:AuthService, private authGuard:AuthRouteGaurd){
    }
    
    getUserDetails(userName: UserName){
        var path="/getuserinfo";
        if(this.authGuard.checkadmin() && userName.username!="user"){
            path="admin"+path;
        }else{
            path="user"+path;
        }
        this.makeRequest.postRequest(UserDetail, userName, path, this.microservice).subscribe(resp => {
            if(resp.headers.get("Authorization") != null){
                this.userDetail = resp.body;
                console.log(this.userDetail);
                localStorage.setItem("userDetail", JSON.stringify(this.userDetail));
                this.route.navigate(["/userinfo"]);
            }
        });
    }

    updateUserDetail(userupdateInfo:UserUpdateInfo, updateChoice:number){
        this.route.navigate(["/loader"]);
        const updateChoices:string[] = ['name','dateofbirth','gender','phone','email','address'];

        var path="/update"+updateChoices[updateChoice];
        if(this.authGuard.checkadmin()){
            path ="admin"+path;
        }else{
            path ="user"+path;
        }
        var feedback : Feedback = {
            massage: ""
        };
        this.makeRequest.postRequest(feedback, userupdateInfo, path, this.microservice)
        .subscribe(
            resp => {
                if((resp.body?.massage != null) && (resp.headers.get("Authorization") != null)){
                    console.log(updateChoices[updateChoice]+" is successfully updated");
                    this.loadUserDetail();
                    this.getUserDetails(new UserName(this.userDetail.username));
                }
            }     
        ) 
    }

    getUserDelete(userName: UserName){
        var path = "/deleteuser";
        if(this.authGuard.checkadmin()){
            path ="admin"+path;
        }else{
            path ="user"+path;
        }
        var feedback : Feedback = {
            massage: ""
        };
        this.makeRequest.postRequest(feedback, userName, path, this.microservice)
        .subscribe(resp =>{
            this.route.navigate(["/loader"])
            if(this.authGuard.checkadmin()){
                this.loadallusers();
            }else{
                localStorage.clear();
                window.location.reload();
                this.authService.userInfo.next(null);
                this.route.navigate(['/home']);
            }
        });
    }

    loadUserDetail(){
        const data = localStorage.getItem("userDetail");
        if(data!=null){
            this.userDetail = JSON.parse(data)
        }
    }

    loadallusers(){
        this.route.navigate(["/loader"]);
        const path = "admin/getallusers"
        this.makeRequest.getRequest(AllUsers, path, this.microservice)
        .subscribe(resp => {
                if(resp.headers.get("Authorization") != null){
                    this.allUsers = resp.body;
                    console.log(this.allUsers.allUsers);
                    localStorage.setItem("allUsers", JSON.stringify(this.allUsers.allUsers));
                    
                    this.route.navigate(["/allusers"]);
                }
            });
    }
}