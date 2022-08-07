import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { catchError, retry, throwError } from "rxjs";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class MakeRequest{
    baseUrls:string[] = ["","http://localhost:9191/", "http://localhost:9192/", "http://localhost:9193/"];

    constructor(private http: HttpClient,  private route:Router, private notifyService:NotificationService){
    }

    // Creates a post request

    postRequest(response: any, data: any, path: string, base:number){
        const requestUrl = this.baseUrls[base]+path;
        return this.http.post<typeof response>(requestUrl,data, { observe: 'response'}).pipe(
            retry(2),
            catchError(error => {
                this.handleError(error);
                
                return throwError(() => new Error("hello"));
            })
        );

    }

    // creates get request 

    getRequest(response: any, path: string, base:number){
        var data:string;
        const acces_token = localStorage.getItem("acces_token");
            if(acces_token!=null){
                data = JSON.parse(acces_token);
            }else{
                data = "akashverma";
            }
        let header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
                'Authorization':data,
            })
        }
        const requestUrl = this.baseUrls[base]+path;
        return this.http.get<typeof response>(requestUrl, { observe: 'response'} ).pipe(
            retry(2),
            catchError(error => {
                this.handleError(error);
                
                return throwError(() => new Error("hello"));
            })
        );
    }


    // error handler in case response error from server
    
    private handleError(error: HttpErrorResponse) {
        
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        }else if(error.status==401){
            // In case of unauthorized user

            this.route.navigate(['/login']);
            console.error('You are unauthorized user', error.error);
            this.notifyService.showError(error.error, "");
        } 
        else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        
      }
}

