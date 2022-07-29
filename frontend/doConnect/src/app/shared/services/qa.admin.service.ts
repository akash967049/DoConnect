import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AnswerList } from "src/app/objects/answerlist";
import { Feedback } from "src/app/objects/Feedback";
import { IdData } from "src/app/objects/iddata";
import { QuestionList } from "src/app/objects/questionlist";
import { MakeRequest } from "../request/make.request";
import { NotificationService } from "./notification.service";

@Injectable()
export class QaAdminService{
    microservice = 2;
    basepath:string = "admin/";
    feedback!:Feedback;
    answerList!:AnswerList;
    questionList!:QuestionList;


    constructor(private http: HttpClient, private route:Router, private makeRequest: MakeRequest, private notifyService:NotificationService){}

    // approve question and answers

    approveAnswer(idData: IdData){
        const path = this.basepath + "approveanswer";
        this.makeRequest.postRequest(this.feedback, idData, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.feedback = resp.body;
                console.log(this.feedback.massage);
                this.notifyService.showSuccess(this.feedback.massage, "");
                this.route.navigate(["/loader"]);
                this.getUnapprovedAnswers();
            }
        });
    }

    approveQuestion(idData: IdData){
        const path = this.basepath + "approvequestion";
        this.makeRequest.postRequest(this.feedback, idData, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.feedback = resp.body;
                console.log(this.feedback.massage);
                this.notifyService.showSuccess(this.feedback.massage, "");this.route.navigate(["/loader"])
                this.getUnapprovedQuestions();
            }
        });
    }

    // Delete question and answers

    deleteAnswer(idData: IdData){
        const path = this.basepath + "deleteanswer";
        this.makeRequest.postRequest(this.feedback, idData, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.feedback = resp.body;
                console.log(this.feedback.massage);
                this.notifyService.showInfo(this.feedback.massage, "");
                this.route.navigate(["/home"]);
            }
        });
    }

    deleteQuestion(idData: IdData){
        const path = this.basepath + "deletequestion";
        this.makeRequest.postRequest(this.feedback, idData, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.feedback = resp.body;
                console.log(this.feedback.massage);
                this.notifyService.showInfo(this.feedback.massage, "");
                this.route.navigate(["/home"]);
            }
        });
    }

    // Reject question and answers

    rejectAnswer(idData: IdData){
        const path = this.basepath + "deleteanswer";
        this.makeRequest.postRequest(this.feedback, idData, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.feedback = resp.body;
                console.log(this.feedback.massage);
                this.notifyService.showInfo(this.feedback.massage, "");
                this.route.navigate(["/home"]);
            }
        });
    }

    rejectQuestion(idData: IdData){
        const path = this.basepath + "deletequestion";
        this.makeRequest.postRequest(this.feedback, idData, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.feedback = resp.body;
                console.log(this.feedback.massage);
                this.notifyService.showInfo(this.feedback.massage, "");
                this.route.navigate(["/home"]);
            }
        });
    }

    // Get List of unapproved question and answers

    getUnapprovedAnswers(){
        this.route.navigate(["/loader"]);
        const path = this.basepath + "getunapprovedanswers";
        this.makeRequest.getRequest(this.answerList, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.answerList = resp.body;
                console.log(this.answerList.answers);
                localStorage.setItem("unapprovedanswers", JSON.stringify(this.answerList.answers));
                this.route.navigate(["/approveanswer"]);
            }
        });
    }

    getUnapprovedQuestions(){
        this.route.navigate(["/loader"]);
        const path = this.basepath + "getunapprovedquestions";
        this.makeRequest.getRequest(this.answerList, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.questionList = resp.body;
                console.log(this.questionList.questions);
                localStorage.setItem("unapprovedquestions", JSON.stringify(this.questionList.questions));
                this.route.navigate(["/approvequestion"])
            }
        });
    }
    
}