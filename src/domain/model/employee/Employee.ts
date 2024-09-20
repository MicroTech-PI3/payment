import AbstractPerson from "../person/AbstractPerson";
import IEmployee from "./types/IEmployee";

export default class Employee extends AbstractPerson implements IEmployee {
  address: string;

  constructor(
    name: string,
    lastName: string,
    phoneNumber: number,
    email: string,
    id: number,
    address: string
  ) {
    super(name, lastName, phoneNumber, email, id);
    this.address = address;
  }

  public getAddress() {
    return this.address;
  }

  public setAddress(address: string) {
    this.address = address;
  }

  public isNull(): boolean {
    return false;
  }
}
