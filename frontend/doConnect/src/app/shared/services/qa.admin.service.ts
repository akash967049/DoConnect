import { Injectable } from "@angular/core";
import { AnswerList } from "src/app/objects/answerlist";
import { Feedback } from "src/app/objects/Feedback";
import { IdData } from "src/app/objects/iddata";
import { QuestionList } from "src/app/objects/questionlist";
import { MakeRequest } from "../request/make.request";

@Injectable()
export class QaAdminService{
    microservice = 2;
    basepath:string = "admin/";
    feedback!:Feedback;
    answerList!:AnswerList;
    questionList!:QuestionList;


    constructor(private makeRequest: MakeRequest){}

    // approve question and answers

    approveAnswer(idData: IdData){
        const path = this.basepath + "approveanswer";
        return this.makeRequest.postRequest(this.feedback, idData, path, this.microservice);
    }

    approveQuestion(idData: IdData){
        const path = this.basepath + "approvequestion";
        return this.makeRequest.postRequest(this.feedback, idData, path, this.microservice);
    }

    // Delete question and answers

    deleteAnswer(idData: IdData){
        const path = this.basepath + "deleteanswer";
        return this.makeRequest.postRequest(this.feedback, idData, path, this.microservice);
    }

    deleteQuestion(idData: IdData){
        const path = this.basepath + "deletequestion";
        return this.makeRequest.postRequest(this.feedback, idData, path, this.microservice);
    }

    // Get List of unapproved question and answers

    getUnapprovedAnswers(){
        const path = this.basepath + "getunapprovedanswers";
        return this.makeRequest.getRequest(this.answerList, path, this.microservice);
    }

    getUnapprovedQuestions(){
        const path = this.basepath + "getunapprovedquestions";
        return this.makeRequest.getRequest(this.answerList, path, this.microservice);
    }
    
}