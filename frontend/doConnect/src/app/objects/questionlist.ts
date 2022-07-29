import { Question } from "./question";

export class QuestionList{
    questions!:Question[];

    constructor(questions:Question[]){
        this.questions = questions;
    }
}