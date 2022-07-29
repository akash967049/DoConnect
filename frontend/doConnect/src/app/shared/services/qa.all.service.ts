import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Question } from "src/app/objects/question";
import { QuestionList } from "src/app/objects/questionlist";
import { SearchData } from "src/app/objects/searchdata";
import { MakeRequest } from "../request/make.request";
import { NotificationService } from "./notification.service";

@Injectable()
export class QaAllService{
    microservice = 2;
    homeQuestions!:QuestionList;

    constructor(private http: HttpClient, private route:Router, private makeRequest: MakeRequest, private notifyService:NotificationService){}

    getQuestionByDescription(searchData:SearchData){
        const path = "all/searchbydescription";
        this.makeRequest.postRequest(this.homeQuestions, searchData, path, this.microservice).subscribe(resp => {
            if(resp.body!=null){
                this.homeQuestions = resp.body;
                console.log(this.homeQuestions.questions);
                    localStorage.setItem("homequestions", JSON.stringify(this.homeQuestions.questions));
                    this.route.navigate(["/home"]);
            }
        });
    }

    getQuestionByTopic(searchData:SearchData){
        const path = "all/searchbytopic";
        this.makeRequest.postRequest(this.homeQuestions, searchData, path, this.microservice).subscribe(resp => {
            if(resp.body!=null){
                this.homeQuestions = resp.body;
                console.log(this.homeQuestions.questions);
                    localStorage.setItem("homequestions", JSON.stringify(this.homeQuestions.questions));
                    this.route.navigate(["/home"]);
            }
        });
    }
}