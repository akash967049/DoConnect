export class Answer{
    id!:number;
    username!:string;
    description!:string;
    questionId!:number;

    constructor(id:number, username:string, description:string, questionId:number){
        this.id = id;
        this.username = username;
        this.description = description;
        this.questionId = questionId;
        
    }
}