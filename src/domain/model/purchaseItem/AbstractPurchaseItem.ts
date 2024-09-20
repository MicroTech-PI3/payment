import Product from "../product/Product";

export default abstract class AbstractPurchaseItem {
  constructor(protected quantity: number, protected product: Product) {}

  public getQuantity() {
    return this.quantity;
  }

  public getProduct() {
    return this.product;
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  public setProduct(product: Product) {
    this.product = product;
  }

  public abstract isNull(): boolean;
}
