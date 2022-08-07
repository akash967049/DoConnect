import { Injectable } from "@angular/core";
import { QuestionList } from "src/app/objects/questionlist";
import { SearchData } from "src/app/objects/searchdata";
import { MakeRequest } from "../request/make.request";

@Injectable()
export class QaAllService{
    microservice = 2;
    questionList!:QuestionList;
    basepath:string = "all/";
    response: any;

    constructor( private makeRequest: MakeRequest){}

    // Request to Search Question By Description from backend

    getQuestionByDescription(searchData:SearchData){
        const path = this.basepath+"searchbydescription";
        return this.makeRequest.postRequest(this.questionList, searchData, path, this.microservice);
    }

    // Request to Search Question By Topic from backend

    getQuestionByTopic(searchData:SearchData){
        const path = this.basepath+"searchbytopic";
        return this.makeRequest.postRequest(this.questionList, searchData, path, this.microservice);
    }

    // Request Search images related to question answer from 
    // backend

    searchImage(searchImg: SearchData){
        const path = this.basepath+"searchimage";
        return this.makeRequest.postRequest(this.response, searchImg, path, this.microservice);
    }
}