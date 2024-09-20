import AbstractProduct from "./AbstractProduct";

export default class Product extends AbstractProduct {
  public isNull(): boolean {
    return false;
  }
}
