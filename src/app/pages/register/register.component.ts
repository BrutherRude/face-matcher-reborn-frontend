import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserRegisterRequest } from './interfaces/request/user-register-request.interface';
import { RegisterService } from 'src/app/pages/register/services/register.service';
import { Router } from '@angular/router';
import { IUserRegisterResponse } from './interfaces/response/user-register-response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  form: FormGroup;

  onSubmit(): void {
    if (!this.form.valid) {
      window.alert('invalid form');
      this.form.reset();
      return;
    }

    this.register(this.form.value as IUserRegisterRequest);
    this.form.reset();
  }

   register(userForm: IUserRegisterRequest): Subscription{
    return this.registerService.registerUser(userForm).subscribe(
      (response: IUserRegisterResponse) => {
        this.router.navigate(['/', 'auth']);
      },
      (error) => {
        window.alert(error.message);
      }
    );
  }
}
