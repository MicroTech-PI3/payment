import NullCustomer from "../customer/NullCustomer";
import NullEmployee from "../employee/NullEmployee";
import AbstractSoldCart from "./AbstractSoldCart";

export default class NullSoldCart extends AbstractSoldCart {
  constructor() {
    super(new Date(), -1, new NullEmployee(), [], new NullCustomer());
  }

  public isNull(): boolean {
    return true;
  }

  public setDate() {
    return;
  }

  public setId() {
    return;
  }

  public setEmployee() {
    return;
  }

  public setProducts() {
    return;
  }

  public setCustomer() {
    return;
  }
}
