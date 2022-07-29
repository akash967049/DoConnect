import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class AuthRouteGaurd implements CanActivate{


    constructor(private authService:AuthService, private route:Router, private notifyService:NotificationService){}

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
            }
            else{
                if(state.url.indexOf("wishlist")> -1){
                    this.notifyService.showInfo("Please login first to see your wishlist", "");
                    this.route.navigate(['/login']);
                    return false;
                }
                if(state.url.indexOf("completed")> -1){
                    this.notifyService.showInfo("Please login first to see your completed books", "");
                    this.route.navigate(['/login']);
                    return false;
                }
            }
            return true;
    
    }

    checklogin():Boolean{
        const userData = this.authService.userInfo.getValue();
        if(userData != null){
            return true;
        }else{
            return false;
        }
        
    }
    
    checkadmin():Boolean{
        const role = this.authService.role.getValue();
        if(role=="admin"){
            return true;
        }else{
            return false;
        }
    }
}