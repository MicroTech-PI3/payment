import Category from "../category/Category";
import Supplier from "../supplier/Supplier";

export default abstract class AbstractProduct {
  constructor(
    protected name: string,
    protected price: number,
    protected description: string,
    protected quantity: number,
    protected supplier: Supplier,
    protected category: Category,
    protected id: number
  ) {}

  public getName() {
    return this.name;
  }

  public getPrice() {
    return this.price;
  }

  public getDescription() {
    return this.description;
  }

  public getQuantity() {
    return this.quantity;
  }

  public getSupplier() {
    return this.supplier;
  }

  public getCategory() {
    return this.category;
  }

  public getId() {
    return this.id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setPrice(price: number) {
    this.price = price;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  public setSupplier(supplier: Supplier) {
    this.supplier = supplier;
  }

  public setCategory(category: Category) {
    this.category = category;
  }

  public setId(id: number) {
    this.id = id;
  }

  public abstract isNull(): boolean;
}
