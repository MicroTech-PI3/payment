import NullProduct from "../product/NullProduct";
import AbstractPurchaseItem from "./AbstractPurchaseItem";

export default class NullPurchaseItem extends AbstractPurchaseItem {
  constructor() {
    super(0, new NullProduct());
  }

  public isNull(): boolean {
    return true;
  }
}
