import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserRequest } from './interfaces/request/user-request.interface';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder, private appService: AppService) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  form: FormGroup;

  onSubmit(): void {


    if(!this.form.valid) {
      window.alert("invalid form");
      this.form.reset();
      return;
    }
    


    this.register(this.form.value as IUserRequest);
    this.form.reset();

  }


  register(userForm: IUserRequest): void {

    this.appService.registerUser(userForm).subscribe(
      response => {
        console.log('Registro bem-sucedido!', response);
      },
      error => {
        console.error('Erro durante o registro:', error);
      }
    );
  }



}
