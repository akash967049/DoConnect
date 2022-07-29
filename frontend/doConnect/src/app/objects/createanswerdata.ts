export class CreateAnswerData{
    description!:string;
    questionId!:number;

    constructor(description:string, questionId:number){
        this.description = description;
        this.questionId = questionId;
    }

}