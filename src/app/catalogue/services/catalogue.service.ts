import { Injectable } from '@angular/core';
import { Product } from "../../shared/entities/product";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) { }
  env = environment;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.env.catalogue);
  }
}
