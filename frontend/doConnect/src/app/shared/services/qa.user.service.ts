import { Injectable } from "@angular/core";
import { AnswerList } from "src/app/objects/answerlist";
import { Feedback } from "src/app/objects/Feedback";
import { IdData } from "src/app/objects/iddata";
import { MakeRequest } from "../request/make.request";


@Injectable()
export class QaUserService{

    microservice = 2;
    basepath:string = "user/";
    feedback!:Feedback;
    currentAnswers!:AnswerList;

    constructor( private makeRequest: MakeRequest){}

    // Request For getting answers by questionId

    getAnswerByQuestionId(idRequest: IdData){
        const path = this.basepath + "answerbyquestionid";
        return this.makeRequest.postRequest(this.currentAnswers, idRequest, path, this.microservice);


    }

    // Request to create a new question and answer

    createAnswer(answerData: FormData){
        const path = this.basepath + "createanswer";
        return this.makeRequest.postRequest(this.feedback, answerData, path, this.microservice);
    }

    createQuestion(questionData: FormData){
        const path = this.basepath + "createquestion";
        return this.makeRequest.postRequest(this.feedback, questionData, path, this.microservice);
    }

}