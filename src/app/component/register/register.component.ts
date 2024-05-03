import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  data: any;
  selectedFile!: File;
  isEdit:boolean=false;
  id:any;
  successMessage!:string;
  // file: any;

  ngOnInit() {
    // debugger;
    // this.getData();
       this.id = this.route.snapshot.params['id'];
      if(this.id)
      {
        this.isEdit=true;
      }
      console.log('ID:', this.id);
      this.authService.getStudentById(this.id).subscribe(res =>
        {
          console.log(res);
          this.registerForm.patchValue(res);
        })
  }
  // getData() {
  //   this.authService.getStudent().subscribe(res => {
  //     this.data = res;
  //     console.log(this.data);
  //   })
  // }
  // gotoList() {
  //   this.router.navigate(['/data']);
  // }


  constructor(private authService: AuthService, private http: HttpClient, private router: Router,private route: ActivatedRoute) { }

  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl(""),
    email: new FormControl("", [Validators.email]),
    mobile: new FormControl("", [Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^[0-9]{10}$/)]),
    gender: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required,this.validatePassword])
    // imageFile: new FormControl("", [Validators.required])
    // rpassword:new FormControl("",[Validators.required])
  }
  );

  // onFileSelect(event: any) {
  //   this.selectedFile = event.target.files[0];

  // }

  onSubmit() {
    console.log(this.registerForm.value);
    // const formData = new FormData();
    // formData.append('firstName', this.registerForm.get('firstName')?.value || '');
    // formData.append('lastName', this.registerForm.get('lastName')?.value || '');
    // formData.append('email', this.registerForm.get('email')?.value || '');
    // formData.append('mobile', this.registerForm.get('mobile')?.value || '');
    // formData.append('gender', this.registerForm.get('gender')?.value || '');
    // formData.append('password', this.registerForm.get('password')?.value || '');
    // formData.append('imageFile', this.selectedFile);

    this.authService.registerStudent(this.registerForm.value).subscribe(res => {
      console.log(res);
      this.successMessage=res.message;
      console.log(this.successMessage);
    }
    )

    this.registerForm.reset();

  }

  // navigateToOther(): void {
  //   // Navigate to the 'other' route
  //   this.router.navigate(['/data']);
  // }

  onUpdate()
  {
    const formData = new FormData();
    formData.append('_id', this.id);
    formData.append('firstName', this.registerForm.get('firstName')?.value || '');
    formData.append('lastName', this.registerForm.get('lastName')?.value || '');
    formData.append('email', this.registerForm.get('email')?.value || '');
    formData.append('mobile', this.registerForm.get('mobile')?.value || '');
    formData.append('gender', this.registerForm.get('gender')?.value || '');
    formData.append('password', this.registerForm.get('password')?.value || '');
    // formData.append('imageFile', this.selectedFile);

    this.authService.updateStudent(this.id,this.registerForm.value).subscribe(res =>
      {
        console.log(res);
      });

  }

  validatePassword(control: FormControl): ValidationErrors | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;
  
    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
      return { invalidPassword: true };
    }
    return null;
  }
  

}
