import { Component } from '@angular/core';
import { CatalogueService } from "../shared/services/catalogue.service";
import { Product } from "../shared/entities/product";
import { map } from "rxjs";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  products: Product[] = [];
  category: string = '';

  constructor(
    private catalogueService: CatalogueService
  ) {
    this.resetSearch();
  }

  private resetSearch() {
    this.catalogueService.getProducts().subscribe(
      products => this.products = products
    );
  }

  onSearch(query: string) {
    this.catalogueService.getProducts().pipe(
      map(products  => products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))),
      map(products => products.filter(product => this.category ? product.category === this.category : true))
    )
    .subscribe(
      products => this.products = products
    )
  }

  onCategoryChange(category: string) {
    this.category = category;
  }

  OnReset() {
    this.resetSearch();

  }

}
