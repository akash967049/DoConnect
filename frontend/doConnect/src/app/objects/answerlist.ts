import { Answer } from "./answer";

export class AnswerList{
    answers!:Answer[];

    constructor(answers:Answer[]){
        this.answers = answers;
    }
}