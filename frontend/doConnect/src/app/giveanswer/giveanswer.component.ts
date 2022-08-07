import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateAnswerData } from '../objects/createanswerdata';
import { Question } from '../objects/question';
import { NotificationService } from '../shared/services/notification.service';
import { QaUserService } from '../shared/services/qa.user.service';

@Component({
  selector: 'app-giveanswer',
  templateUrl: './giveanswer.component.html',
  styleUrls: ['./giveanswer.component.css']
})
export class GiveanswerComponent implements OnInit {

  @Input() question!: Question;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(private qaUserService:QaUserService, private notify: NotificationService) { }

  ngOnInit(): void {
  }

  // Form to get Answer Details

  giveAnswerForm = new FormGroup({
    InputDescription: new FormControl("",[
      Validators.required
    ])
  });

  // Send A backend request with answer data to add to answer Table

  giveAnswerSubmited(){
    const description = this.giveAnswerForm.value.InputDescription;
    if(description!=null){
      const createAnswer = new CreateAnswerData(description, this.question.id);
      const answerData = new FormData();
      answerData.append('answer', new Blob([JSON.stringify(createAnswer)], {type: 'application/json'}));
    if(this.selectedFile!=null){
    answerData.append('imageFile', this.selectedFile);
    }

    this.qaUserService.createAnswer(answerData).subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
          this.notify.showSuccess(this.message, "");
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
    }else{
      console.log("Input are not valid for creating question");
      this.notify.showError("Question Not uploaded", "");
    } 
  }

  get InputDescription(){
    return this.giveAnswerForm.get("InputDescription") as FormControl;
  }

  // Check for file input so that it can be uploaded

  public onFileChanged(event) {
    if(event.target.files!=null){
    this.selectedFile = <File> event.target.files.item(0);
    console.log(this.selectedFile);
    console.log(event);
    }
  }

}
