export class Product {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;

  constructor(
    name: string,
    description: string,
    price: number,
    category: string,
    image: string) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
  }
}
