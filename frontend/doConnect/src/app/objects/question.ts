export class Question{
    id!:number;
    username!:string;
    topic!:string;
    description!:string;

    constructor(id:number, username:string, topic:string, description:string){

        this.id = id;
        this.description = description;
        this.topic = topic;
        this.username = username;

    }

}