import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class AuthRouteGaurd implements CanActivate{


    constructor(private authService:AuthService, private route:Router, private notifyService:NotificationService){}

    // method checks wether a router link will be available to 
    // user or not

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): 
         | boolean 
         | UrlTree  
         | Observable<boolean | UrlTree>  
         | Promise<boolean | UrlTree> {

        const userData = this.authService.userInfo.getValue();
        if(userData != null){
            if(state.url.indexOf("login") > -1){
                this.notifyService.showInfo("you are already logged in","");
                this.route.navigate(['/home']);
                return false;
            }
            if(state.url.indexOf("signup") > -1){
                this.notifyService.showInfo("You are logged in first log out to register as new user", "");
                this.route.navigate(['/home']);
                return false;
            }
            if(this.authService.role.getValue() == "user"){
                if(state.url.indexOf("allusers") > -1){
                    this.notifyService.showInfo("Please login as Admin to see all users", "");
                    this.route.navigate(['/login']);
                    return false;
                }
                if(state.url.indexOf("approvequestion") > -1){
                    this.notifyService.showInfo("Please login as Admin to Approve Questions", "");
                    this.route.navigate(['/login']);
                    return false;
                }
                if(state.url.indexOf("approveanswer") > -1){
                    this.notifyService.showInfo("Please login as Admin to Approve Answers", "");
                    this.route.navigate(['/login']);
                    return false;
                }
                
            }
        }
        else{
            if(state.url.indexOf("allusers") > -1){
                this.notifyService.showInfo("Please login as Admin to see all users", "");
                this.route.navigate(['/login']);
                return false;
            }
            if(state.url.indexOf("approvequestion") > -1){
                this.notifyService.showInfo("Please login as Admin to Approve Questions", "");
                this.route.navigate(['/login']);
                return false;
            }
            if(state.url.indexOf("approveanswer") > -1){
                this.notifyService.showInfo("Please login as Admin to Approve Answers", "");
                this.route.navigate(['/login']);
                return false;
            }
            if(state.url.indexOf("userinfo") > -1){
                this.notifyService.showInfo("Please login first to see your userinfo", "");
                this.route.navigate(['/login']);
                return false;
            }
            if(state.url.indexOf("askquestion") > -1){
                this.notifyService.showInfo("Please login first to ask your question", "");
                this.route.navigate(['/login']);
                return false;
            }
            if(state.url.indexOf("askquestion") > -1){
                this.notifyService.showInfo("Please login first to ask your question", "");
                this.route.navigate(['/login']);
                return false;
            }
            }
        return true;
    
    }

    // Checks wether someone is logged in or not

    checklogin():Boolean{
        const userData = this.authService.userInfo.getValue();
        if(userData != null){
            return true;
        }else{
            return false;
        }
        
    }

    // check wether admin is logged in or not
    
    checkadmin():Boolean{
        const role = this.authService.role.getValue();
        if(role=="admin"){
            return true;
        }else{
            return false;
        }
    }
}