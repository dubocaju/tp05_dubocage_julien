import { Injectable } from '@angular/core';
import { Client } from "../entities/client";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  env = environment;
  private _client: Client;

  constructor(private http: HttpClient) {
    this._client = new Client();
  }

  get client(): Client {
    return this._client;
  }

  set client(value: Client) {
    this._client = value;
  }

  register(client: Client): Observable<Client> {
    return this.http.post<Client>(this.env.apiBaseUrl + '/register', client);
  }
}
