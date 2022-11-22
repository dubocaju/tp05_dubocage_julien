import { Product } from "../entities/product";

export class AddProduct {
  static readonly type = '[Cart] AddProduct';
  constructor(public payload: Product) {}
}

export class RemoveProduct {
  static readonly type = '[Cart] RemoveProduct';

  constructor(public payload: Number) {}
}
