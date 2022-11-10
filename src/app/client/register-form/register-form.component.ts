import {Component} from '@angular/core';
import {Client} from "../entities/client";
import {Router} from "@angular/router";
import {ClientService} from "../services/client.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  model: Client;

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {
    this.model = this.clientService.client
  }

  onSubmit() {
    this.clientService.client = this.model
    this.router.navigate(['/client/result']);
   }
}
