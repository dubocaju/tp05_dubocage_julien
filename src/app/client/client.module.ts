import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { RegisterFormComponent } from "./register-form/register-form.component";
import { ResultFormComponent } from "./result-form/result-form.component";
import { FormInputDirective } from "./directives/form-input.directive";
import { PasswordPipe } from "./pipes/password.pipe";
import { PhonePipe } from "./pipes/phone.pipe";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  { path: 'register', component: RegisterFormComponent },
  { path: 'result', component: ResultFormComponent }
];

@NgModule({
  declarations: [
    RegisterFormComponent,
    ResultFormComponent,
    FormInputDirective,
    PasswordPipe,
    PhonePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
  ]
})

export class ClientModule { }
