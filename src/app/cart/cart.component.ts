import { Component } from '@angular/core';
import { Product } from "../shared/entities/product";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { RemoveProduct } from "../shared/actions/cart-action";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products$: Observable<Product[]>;

  constructor(private store: Store) {
    this.products$ = this.store.select(state => state.cart.products);
  }

  removeProductFromCart(product: Product) {
    this.store.dispatch(new RemoveProduct(product));
  }

}
