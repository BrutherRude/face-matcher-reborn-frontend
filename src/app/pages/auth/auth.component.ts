import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthRequest } from './interfaces/request/auth-request.interface';
import { IAuthResponse } from './interfaces/response/auth-response.interface';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  form: FormGroup;

  ngOnInit() {
    if (this.authService.token) {
      this.router.navigate(['']);
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      window.alert('Invalid form');
      this.form.reset();
      return;
    }

    this.login(this.form.value as IAuthRequest);
    this.form.reset();
  }

  login(userForm: IAuthRequest): Subscription {
    return this.authService.login(userForm).subscribe(
      (response: IAuthResponse) => {
        this.authService.token = response.token;
        this.router.navigate(['']);
      },
      (error) => {
        window.alert(error.message);
      }
    );
  }
}
