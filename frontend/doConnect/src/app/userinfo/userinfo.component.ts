import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Name } from '../objects/name';
import { UserDetail } from '../objects/userdetail';
import { UserName } from '../objects/userName';
import { UserUpdateInfo } from '../objects/userUpdateInfo';
import { AuthRouteGaurd } from '../shared/guards/auth.route.guards';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  userDetail!:UserDetail;
  gender:string="";

  userUpdateInfo:UserUpdateInfo = new UserUpdateInfo(new Name("","",""),"","");

  userinfoData:BehaviorSubject<any> = new BehaviorSubject(null);

  userName:UserName = new UserName("");

  constructor(private userService:UserService, public authGuard:AuthRouteGaurd) {
    this.loadUserDetail();
   }

  ngOnInit(): void {
    this.loadUserDetail();
    this.userinfoData.next(this.userDetail);
    this.getGenderDetail();
  }

  // Method to load user details from localstorage

  loadUserDetail(){
    const data = localStorage.getItem("userDetail");
    if(data!=null){
      this.userDetail = JSON.parse(data)
      
    }
  }

  // Method to get gender

  getGenderDetail(){
    const g = this.userinfoData.value.gender;
    if(g=="M"){
      this.gender = "Male";
    }else if(g=="F"){
      this.gender = "Female";
    }else if(g=="O"){
      this.gender = "Other";
    }else{
      this.gender = "Prefer not to say";
    }

  }

  updateName = new FormGroup({
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
  });

  updateGender = new FormGroup({
    InputGender: new FormControl("", [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  updatePhone = new FormGroup({
    InputPhone : new FormControl("", [
      Validators.required, 
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern("[0-9]*")
    ])
  });

  updateEmail = new FormGroup({
    InputEmail: new FormControl("", [
      Validators.required, 
      Validators.email
    ])
  });

  updateAddress = new FormGroup({
    InputAddress: new FormControl("", [
      Validators.required
    ])
  });

  updateDateOfBirth = new FormGroup({
    InputDateOfBirth: new FormControl("",[])
  });

  get InputAddress(){
    return this.updateAddress.get("InputAddress") as FormControl;
  }

  get InputFirstName(){
    return this.updateName.get("InputFirstName") as FormControl;
  }

  get InputMiddleName(){
    return this.updateName.get("InputMiddleName") as FormControl;
  }

  get InputLastName(){
    return this.updateName.get("InputLastName") as FormControl;
  }

  get InputGender(){
    return this.updateGender.get("InputGender") as FormControl;
  }

  get InputEmail(){
    return this.updateEmail.get("InputEmail") as FormControl;
  }

  get InputPhone(){
    return this.updatePhone.get("InputPhone") as FormControl;
  }

  get InputDateOfBirth(){
    return this.updateDateOfBirth
  }

  // Mehtod to update name

  updateNameSubmited(){
    const name = this.updateName.value;
    if(name.InputFirstName!=null && name.InputFirstName!= undefined){
    this.userUpdateInfo.nameRequest.firstname=name.InputFirstName;
    }
    if(name.InputMiddleName!=null && name.InputMiddleName!= undefined){
      this.userUpdateInfo.nameRequest.middlename=name.InputMiddleName;
      }
    if(name.InputLastName!=null && name.InputLastName!= undefined){
      this.userUpdateInfo.nameRequest.lastname=name.InputLastName;
      this.userUpdateInfo.username = this.userDetail.username;
      this.userService.updateUserDetail(this.userUpdateInfo, 0);
    }
  }

  // Mehtod to update gender

  updateGenderSubmited(){
    const value = this.updateGender.value.InputGender;
    if(value!=null && value!=undefined){
      this.userUpdateInfo.value=value;
      this.userUpdateInfo.username = this.userDetail.username;
      this.userService.updateUserDetail(this.userUpdateInfo, 2);
    }
  }

  // Mehtod to update phone

  updatePhoneSubmited(){
    const value = this.updatePhone.value.InputPhone;
    if(value!=null && value!=undefined){
      this.userUpdateInfo.value=value;
      this.userUpdateInfo.username = this.userDetail.username;
      this.userService.updateUserDetail(this.userUpdateInfo, 3);
    }
  }

  // Mehtod to update email

  updateEmailSubmited(){
    const value = this.updateEmail.value.InputEmail;
    if(value!=null && value!=undefined){
      this.userUpdateInfo.value=value;
      this.userUpdateInfo.username = this.userDetail.username;
      this.userService.updateUserDetail(this.userUpdateInfo, 4);
    }
  }

  // Mehtod to update address

  updateAddressSubmited(){
    const value = this.updateAddress.value.InputAddress;
    if(value!=null && value!=undefined){
      this.userUpdateInfo.value=value;
      this.userUpdateInfo.username = this.userDetail.username;
      this.userService.updateUserDetail(this.userUpdateInfo, 5);
    }
  }

  // Mehtod to update date Of Birth

  updateDateOfBirthSubmited(){
    const value = this.updateDateOfBirth.value.InputDateOfBirth;
    if(value!=null && value!=undefined){
      this.userUpdateInfo.value=value;
      this.userUpdateInfo.username = this.userDetail.username;
      this.userService.updateUserDetail(this.userUpdateInfo, 1);
    }
  }

  // Method to delete user

  deleteUser(){
    this.userName.username=this.userDetail.username;
    this.userService.getUserDelete(this.userName);
  }

  // Checks wether to show delete button or not

  showdeletebutton():Boolean{
    if(this.userDetail.username!="akash"){
      return true;
    }else{
      return false;
    }
  }
}
