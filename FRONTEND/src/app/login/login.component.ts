import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../shared/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  onSubmit() {
    if (this.loginForm.value.login != null && this.loginForm.value.password != null) {
      this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(
        data => console.log(data)
      )
    }
  }
}
