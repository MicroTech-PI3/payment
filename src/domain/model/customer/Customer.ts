import AbstractPerson from "../person/AbstractPerson";
import ICustomer from "./types/ICustomer";

export default class Customer extends AbstractPerson implements ICustomer {
  billVia: string;

  constructor(
    name: string,
    lastName: string,
    phone: number,
    email: string,
    id: number,
    billVia: string
  ) {
    super(name, lastName, phone, email, id);
    this.billVia = billVia;
  }

  public getBillVia(): string {
    return this.billVia;
  }

  public setBillVia(billVia: string): void {
    this.billVia = billVia;
  }

  public isNull(): boolean {
    return false;
  }
}
