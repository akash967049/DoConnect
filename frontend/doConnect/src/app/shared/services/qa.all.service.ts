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
    questionList!:QuestionList;
    basepath:string = "all/";
    response: any;

    constructor(private http: HttpClient, private route:Router, private makeRequest: MakeRequest, private notifyService:NotificationService){}

    getQuestionByDescription(searchData:SearchData){
        const path = this.basepath+"searchbydescription";
        return this.makeRequest.postRequest(this.questionList, searchData, path, this.microservice);
    }

    getQuestionByTopic(searchData:SearchData){
        const path = this.basepath+"searchbytopic";
        return this.makeRequest.postRequest(this.questionList, searchData, path, this.microservice);
    }

    searchImage(searchImg: SearchData){
        const path = this.basepath+"searchimage";
        return this.makeRequest.postRequest(this.response, searchImg, path, this.microservice);
    }
}