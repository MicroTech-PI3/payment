import NullAbstractPerson from "../person/NullAbstractPerson";
import IEmployee from "./types/IEmployee";

export default class NullEmployee
  extends NullAbstractPerson
  implements IEmployee
{
  address: string;

  constructor() {
    super();
    this.address = "Address not found";
  }

  public getAddress() {
    return this.address;
  }

  public setAddress() {
    return;
  }
}
