import { CartStateModel } from "./cart-state-model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { AddProduct, RemoveProduct } from "../actions/cart-action";

@State<CartStateModel>({
  name: "cart",
  defaults: {
    products: []
  }
})

@Injectable()
export class CartState {
  @Selector()
  static getProductCount(state: CartStateModel) {
    return state.products.length;
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      products: [...state.products, payload],
    });
  }

  @Action(RemoveProduct)
  remove(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: RemoveProduct
  ) {
    const state = getState();
    patchState({
      products: state.products.filter(
        (product, index) => index !== payload)
    });
  }

}
