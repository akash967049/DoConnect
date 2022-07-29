import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserSignup } from '../objects/usersignup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  genders: string[] = ['Male', 'Female', 'Other', 'Prefer Not to say'];
  defaultGender: string = 'Select Gender';
  
  constructor(private authService:AuthService, private route:Router) { }

  ngOnInit(): void {
    
  }

  registerForm = new FormGroup({
    InputUserName: new FormControl("", [
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z]*")
    ]),
    InputFirstName: new FormControl("", [
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("[a-z A-Z]*"),
    ]),
    InputMiddleName: new FormControl("", [
      Validators.pattern("[a-z A-Z]*"),
    ]),
    InputLastName: new FormControl("", [
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("[a-z A-Z]*"),
    ]),
    InputMobile: new FormControl("", [
      Validators.required, 
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern("[0-9]*")
    ]),
    InputGender: new FormControl("", [
      Validators.required,
      Validators.minLength(1)
    ]),
    InputEmail: new FormControl("", [
      Validators.required, 
      Validators.email
    ]),
    InputPassword: new FormControl("",[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
    ])
  });

  registerSubmited(){
    console.log(this.registerForm.value);
    const userSignup = new UserSignup(
      this.registerForm.value.InputUserName, 
      this.registerForm.value.InputFirstName,
      this.registerForm.value.InputMiddleName,
      this.registerForm.value.InputLastName,
      this.registerForm.value.InputGender,
      this.registerForm.value.InputMobile,
      this.registerForm.value.InputEmail,
      this.registerForm.value.InputPassword
    );
    this.route.navigate(["/loader"]);
    this.authService.userregister(userSignup);

  }

  get InputUserName(){
    return this.registerForm.get("InputUserName") as FormControl;
  }

  get InputFirstName(){
    return this.registerForm.get("InputFirstName") as FormControl;
  }

  get InputMiddleName(){
    return this.registerForm.get("InputMiddleName") as FormControl;
  }

  get InputLastName(){
    return this.registerForm.get("InputLastName") as FormControl;
  }

  get InputGender(){
    return this.registerForm.get("InputGender") as FormControl;
  }

  get InputEmail(){
    return this.registerForm.get("InputEmail") as FormControl;
  }

  get InputMobile(){
    return this.registerForm.get("InputMobile") as FormControl;
  }

  get InputPassword(){
    return this.registerForm.get("InputPassword") as FormControl;
  }
}
