import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateQuestionData } from '../objects/createquestiondata';
import { AuthService } from '../shared/services/auth.service';
import { QaUserService } from '../shared/services/qa.user.service';
import { SearchData } from '../objects/searchdata';

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
  imageName: any;
  searchImg: any;

  constructor(private qaUserService:QaUserService, private route:Router, private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

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
          alert("Uploaded")
        } else {
          this.message = 'Question not uploaded successfully';
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

  public onFileChanged(event) {
    // Select File
    if(event.target.files!=null){
    this.selectedFile = <File> event.target.files.item(0);
    console.log(this.selectedFile);
    console.log(event);
    }
  }

  // ***************************************


    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
      //Make a call to Sprinf Boot to get the Image Bytes.
      console.log("get image clicked");

      this.searchImg = new SearchData(this.imageName);
      console.log("search data is prepared");
      this.httpClient.post('http://localhost:9192/all/searchimage', this.searchImg, { observe: 'response' })
        .subscribe(
          res => {
            console.log("image as response");
            this.retrieveResonse = res.body;
            this.base64Data = this.retrieveResonse.picByte;
            if(this.retrieveResonse.picByte != null){
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            }else{
              this.retrievedImage = null;
            }
          }
        );
    }

    //***************************** */

}
