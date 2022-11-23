import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../shared/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jwtError: boolean | undefined;
  loggedIn: boolean = false;

  loginForm = this.fb.group({
    login: ['', Validators.required],    password: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jwtError = params['jwtError'];
    });
  }

  onSubmit() {
    if (this.loginForm.value.login != null && this.loginForm.value.password != null) {
      this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(
        () => this.loggedIn = true
      )
    }
  }

}
