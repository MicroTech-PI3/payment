import AbstractPerson from "../person/AbstractPerson";
import ISupplier from "./types/ISupplier";

export default class Supplier extends AbstractPerson implements ISupplier {
  city: string;
  brand: string;

  constructor(
    name: string,
    lastName: string,
    phoneNumber: number,
    email: string,
    id: number,
    city: string,
    brand: string
  ) {
    super(name, lastName, phoneNumber, email, id);
    this.city = city;
    this.brand = brand;
  }

  public getCity() {
    return this.city;
  }

  public setCity(city: string) {
    this.city = city;
  }

  public getBrand() {
    return this.brand;
  }

  public setBrand(brand: string) {
    this.brand = brand;
  }

  public isNull(): boolean {
    return false;
  }
}
