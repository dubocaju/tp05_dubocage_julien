import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  env = environment;

  login(login: string, password: string): Observable<any> {
    return this.http.post(this.env.apiBaseUrl + '/login', { login, password });
  }
}
