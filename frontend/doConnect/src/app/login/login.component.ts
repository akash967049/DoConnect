import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private route:Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    InputUserName: new FormControl("", [
      Validators.required, 
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z]*")
    ]),
    
    InputPassword: new FormControl("",[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
    ])
  });

  loginSubmited(){
    //console.log(this.loginForm.value);
    this.route.navigate(['/loader']);
    this.authService.userLogin(this.loginForm.value.InputUserName, this.loginForm.value.InputPassword);   
  }

  get InputUserName(){
    return this.loginForm.get("InputUserName") as FormControl;
  }

  get InputPassword(){
    return this.loginForm.get("InputPassword") as FormControl;
  }
}
