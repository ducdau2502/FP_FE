import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {FormArray, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    fullName:null,
    age : null,
    address: null,
    identityCard: null,
    bankAccount:null,
    statusName:null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isStatus = false;

  constructor(private authService: AuthService,fb: FormBuilder) {
  }
  ngOnInit(): void {
  }
  testCheck(event:any){
    console.log(event.target.checked)

  }

  onSubmit(): void {

    if (this.isStatus){
      this.form.statusName = "waiting";
    } else {
      this.form.statusName = "no";
    }
    console.log(this.form.statusName)
    const { username, email, password,
      fullName,age,address,identityCard,bankAccount,statusName} = this.form

    this.authService.register(username,
      email,
      password,
      fullName,
      age,
      address,
      identityCard,
      bankAccount,
      statusName
    ).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.href ="home.html";
  }
}
