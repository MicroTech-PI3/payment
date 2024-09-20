import AbstractPurchaseItem from "./AbstractPurchaseItem";

export default class PurchaseItem extends AbstractPurchaseItem {
  public isNull(): boolean {
    return false;
  }
}
