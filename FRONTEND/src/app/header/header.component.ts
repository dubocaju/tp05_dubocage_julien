import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { CartState } from "../shared/states/cart-state";
import { Select } from "@ngxs/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Select(CartState.getProductCount) productCount$!: Observable<number>;

  constructor() { }

}
