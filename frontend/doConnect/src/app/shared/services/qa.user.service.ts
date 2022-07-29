import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AnswerList } from "src/app/objects/answerlist";
import { CreateAnswerData } from "src/app/objects/createanswerdata";
import { CreateQuestionData } from "src/app/objects/createquestiondata";
import { Feedback } from "src/app/objects/Feedback";
import { IdData } from "src/app/objects/iddata";
import { MakeRequest } from "../request/make.request";
import { NotificationService } from "./notification.service";


@Injectable()
export class QaUserService{

    microservice = 2;
    basepath:string = "user/";
    feedback!:Feedback;
    currentAnswers!:AnswerList;

    constructor(private http: HttpClient, private route:Router, private makeRequest: MakeRequest, private notifyService:NotificationService){}

    getAnswerByQuestionId(idRequest: IdData){
        this.route.navigate(["/loader"]);
        const path = this.basepath + "answerbyquestionid";
        this.makeRequest.postRequest(this.currentAnswers, idRequest, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.currentAnswers = resp.body;
                console.log(this.currentAnswers.answers);
                localStorage.setItem("currentanswer", JSON.stringify(this.currentAnswers.answers));
                this.route.navigate(["/questionanswer"]);
            }
        });

    }

    createAnswer(createAnswer:CreateAnswerData){
        const path = this.basepath + "createanswer";
        this.makeRequest.postRequest(this.feedback, createAnswer, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.feedback = resp.body;
                console.log(this.feedback.massage);
                this.notifyService.showSuccess(this.feedback.massage,"");
                this.route.navigate(["/home"]);
            }
        });
    }

    createQuestion(createQuestion:CreateQuestionData){
        this.route.navigate(['/loader']);
        const path = this.basepath + "createquestion";
        this.makeRequest.postRequest(this.feedback, createQuestion, path, this.microservice).subscribe(resp => {
            if(resp.body != null){
                this.feedback = resp.body;
                console.log(this.feedback.massage);
                this.notifyService.showSuccess(this.feedback.massage,"");
                this.notifyService.showInfo("You can ask another question or go to home to explore more","")
                this.route.navigate(["/askquestion"]);
            }
        });
    }

}