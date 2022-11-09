import { Component, OnInit } from '@angular/core';
import {Product} from "../../shared/entities/product";
import {CatalogueService} from "../services/catalogue.service";
import {Store} from "@ngxs/store";
import {ActivatedRoute} from "@angular/router";
import {AddProduct} from "../../shared/actions/cart-action";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.catalogueService.getProducts().subscribe(
      products => this.product = products.find(p => p.id == this.route.snapshot.params['id'])
    );
  }

  addProductToCart(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

}
