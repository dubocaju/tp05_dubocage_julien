import { Component } from '@angular/core';
import { CatalogueService } from "../shared/services/catalogue.service";
import { Product } from "../shared/entities/product";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  products: Product[] = [];

  constructor(
    private catalogueService: CatalogueService
  ) {
    this.catalogueService.getProducts().subscribe(
      products => this.products = products
    );
  }

}
