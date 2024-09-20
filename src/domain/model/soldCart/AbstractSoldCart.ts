import Customer from "../customer/Customer";
import Employee from "../employee/Employee";
import PurchaseItem from "../purchaseItem/PurchaseItem";

export default abstract class AbstractSoldCart {
  constructor(
    protected date: Date,
    protected id: number,
    protected employee: Employee,
    protected products: PurchaseItem[],
    protected customer: Customer
  ) {}

  public getDate() {
    return this.date;
  }

  public getId() {
    return this.id;
  }

  public getEmployee() {
    return this.employee;
  }

  public getProducts() {
    return this.products;
  }

  public getCustomer() {
    return this.customer;
  }

  public setDate(date: Date) {
    this.date = date;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setEmployee(employee: Employee) {
    this.employee = employee;
  }

  public setProducts(products: PurchaseItem[]) {
    this.products = products;
  }

  public setCustomer(customer: Customer) {
    this.customer = customer;
  }

  public abstract isNull(): boolean;
}
