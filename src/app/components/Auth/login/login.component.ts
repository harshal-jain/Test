
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
payload : any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  setPayLoad() {
    this.payload = {
      email: this.f.email.value,
      password: this.f.password.value,
    };
  }

  login() {
    this.loading = true;
    this.setPayLoad();
    this.authService.login(this.payload).subscribe(
      (res) => {
        this.router.navigate(['dashboard']);
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.submitted = false;
        this.loading = false;
        alert(error.message);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.submitted = false;
      return;
    } else {
      this.login();
    }
  }
}
