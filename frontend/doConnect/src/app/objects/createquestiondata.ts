export class CreateQuestionData{
    description!:string;
    topic!:string;

    constructor(description:string, topic:string){
        this.description = description;
        this.topic = topic;
    }
}