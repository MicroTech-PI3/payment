import NullAbstractPerson from "../person/NullAbstractPerson";
import ICustomer from "./types/ICustomer";

export default class NullCustomer
  extends NullAbstractPerson
  implements ICustomer
{
  billVia: string;

  constructor() {
    super();
    this.billVia = "The invoice sending via was not found";
  }

  public getBillVia(): string {
    return this.billVia;
  }

  public setBillVia(): void {
    return;
  }
}
