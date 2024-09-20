import NullCategory from "../category/NullCategory";
import NullSupplier from "../supplier/NullSupplier";
import AbstractProduct from "./AbstractProduct";

export default class NullProduct extends AbstractProduct {
  constructor() {
    super(
      "Name not found",
      0,
      "Description not found",
      0,
      new NullSupplier(),
      new NullCategory(),
      -1
    );
  }

  public setName() {
    return;
  }

  public setPrice() {
    return;
  }

  public setDescription() {
    return;
  }

  public setQuantity() {
    return;
  }

  public setSupplier() {
    return;
  }

  public isNull(): boolean {
    return true;
  }
}
