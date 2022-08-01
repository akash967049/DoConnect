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

    createAnswer(answerData: FormData){
        const path = this.basepath + "createanswer";
        return this.makeRequest.postRequest(this.feedback, answerData, path, this.microservice);
    }

    createQuestion(questionData: FormData){
        const path = this.basepath + "createquestion";
        return this.makeRequest.postRequest(this.feedback, questionData, path, this.microservice);
    }

}