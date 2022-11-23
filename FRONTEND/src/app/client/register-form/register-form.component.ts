import { Component, OnInit } from '@angular/core';
import { Client } from "../entities/client";
import { Router } from "@angular/router";
import { ClientService } from "../services/client.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  model: Client  = this.clientService.client;
  clientForm = this.fb.group({
    lastname: [this.model.lastname, Validators.required],
    firstname: [this.model.firstname, Validators.required],
    email: [this.model.email, [Validators.required, Validators.email]],
    login: [this.model.login, [Validators.required, Validators.pattern('\\S{5}\\S*')]],
    password: [this.model.password, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]],
    phone: [this.model.phone, [Validators.required, Validators.pattern('^([0-9]\\s?){9,13}[0-9]$')]],
    locale: [this.model.locale, Validators.required],
    address: [this.model.address, Validators.required],
    city: [this.model.city, [Validators.required, Validators.pattern('^[A-Za-z-]{2,20}$')]],
    zip: [this.model.zip, [Validators.required, Validators.pattern('^(?:0[1-9]|[1-8]\\d|9[0-8])\\d{3}$')]],
    country: [this.model.country, [Validators.required, Validators.pattern('^[A-Za-z-]{2,20}$')]],
    civility: [this.model.civility, Validators.required]
  });

  constructor(
    private router: Router,
    private clientService: ClientService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.clientForm.valueChanges.subscribe(form => {
      this.model.firstname = form.firstname ?? '';
      this.model.lastname = form.lastname ?? '';
      this.model.email = form.email ?? '';
      this.model.login = form.login ?? '';
      this.model.password = form.password ?? '';
      this.model.phone = form.phone ?? '';
      this.model.locale = form.locale ?? '';
      this.model.address = form.address ?? '';
      this.model.city = form.city ?? '';
      this.model.zip = form.zip ?? '';
      this.model.country = form.country ?? '';
      this.model.civility = form.civility ?? '';
    })
  }

  onSubmit() {
    this.clientService.register(this.model).subscribe(
      client => {
        this.clientService.client = client;
        this.router.navigate(['/client/result']);
      }
    )
  }
}
