import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateQuestionData } from '../objects/createquestiondata';
import { QaUserService } from '../shared/services/qa.user.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-askquestion',
  templateUrl: './askquestion.component.html',
  styleUrls: ['./askquestion.component.css']
})
export class AskquestionComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  searchImg: any;

  constructor(private qaUserService:QaUserService, private notifyService: NotificationService) { }

  ngOnInit(): void {
  }

  // Form to get ask question details from a form

  askQuestionForm = new FormGroup({
    InputTopic: new FormControl("",[
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z]*")
    ]),
    InputDescription: new FormControl("",[
      Validators.required
    ])
  })

  // Request to add new Question to database

  askQuestionSubmited(){
    const topic = this.askQuestionForm.value.InputTopic;
    const description = this.askQuestionForm.value.InputDescription;
    const questionData = new FormData();
    const createQuestion = new CreateQuestionData(description, topic);
    questionData.append('question', new Blob([JSON.stringify(createQuestion)], {type: 'application/json'}));
    if(this.selectedFile!=null){
    questionData.append('imageFile', this.selectedFile);
    }

    //Make a call to the Spring Boot Application to save the image
    this.qaUserService.createQuestion(questionData).subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Question uploaded successfully';
          this.notifyService.showSuccess(this.message, "");
        } else {
          this.message = 'Question not uploaded successfully';
          this.notifyService.showSuccess(this.message, "");
        }
      }
      );

  }

  get InputTopic(){
    return this.askQuestionForm.get("InputTopic") as FormControl;
  }

  get InputDescription(){
    return this.askQuestionForm.get("InputDescription") as FormControl;
  }

  // method checks file input from the user

  public onFileChanged(event) {
    // Select File
    if(event.target.files!=null){
    this.selectedFile = <File> event.target.files.item(0);
    console.log(this.selectedFile);
    console.log(event);
    }
  }
}
