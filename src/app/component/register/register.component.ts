import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {FormArray, FormBuilder} from "@angular/forms";
import {FileUpload} from "../../model/file-upload.model";
import {FileUploadService} from "../../service/file-upload.service";
import {NgToastService} from "ng-angular-popup";

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
    gender : null,
    address: null,
    identityCard: null,
    avatar : null,

    bankAccount:null,
    statusName:null,

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isStatus = false;

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private uploadService : FileUploadService,
              private toast: NgToastService) {
  }
  ngOnInit(): void {
  }
  testCheck(event:any){
    console.log(event.target.checked)
    this.isStatus = event.target.checked
    console.log(this.isStatus)

  }

  onSubmit(): void {

    if (this.isStatus){
      this.form.statusName = "Waiting";
    } else{
      this.form.statusName = "Activated";
    }
    console.log(this.form.statusName);
    this.form.avatar = this.currentFileUpload?.url;
    const { username, email, password,
      fullName,age,gender,address,identityCard,avatar, bankAccount,statusName
    } = this.form

    this.authService.register(
      username,
      email,
      password,
      fullName,
      age,
      gender,
      address,
      identityCard,
      avatar,
      // gender,
      bankAccount,
      statusName
    ).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toast.success({detail: "Successful Message", summary: "Register Successful", duration: 5000})
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
    console.log(this.form)
  }

  selectFileAvatar(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);

        }, error => {console.log(error);

        });
      }
    }
  }
  reloadPage(): void {
    window.location.pathname ="home";
  }

}
