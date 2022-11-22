import { Component, OnInit } from '@angular/core';
import { CatalogueService } from "../services/catalogue.service";
import { Product } from "../../shared/entities/product";
import { map } from "rxjs";
import { Store } from "@ngxs/store";
import { AddProduct } from "../../shared/actions/cart-action";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];
  category: string = '';

  constructor(
    private catalogueService: CatalogueService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.resetSearch();
  }

  private resetSearch() {
    this.catalogueService.getProducts().subscribe(
      products => this.products = products
    );
  }

  addProductToCart(product: Product) {
    this.store.dispatch(new AddProduct(product));
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
