import IProvider from "../../../domain/interfaces/infrastructure/repository/provider/IProvider";
import DBISoldItems from "../../../domain/model/database/DBISoldItems";
import SoldCart from "../../../domain/model/soldCart/SoldCart";
import MySqlDBC from "../../../util/database/MySqlDBC";
import CustomerProvider from "./CustomerProvider";
import EmployeeProvider from "./EmployeeProvider";
import PurchaseItemProvider from "./PurchaseItemProvider";

export default class SoldCartProvider implements IProvider<SoldCart> {
  constructor(
    private readonly mySqlDBC: MySqlDBC,
    private readonly purchaseItemProvider: PurchaseItemProvider,
    private readonly employeeProvider: EmployeeProvider,
    private readonly customerProvider: CustomerProvider
  ) {}

  async findAll(): Promise<SoldCart[]> {
    try {
      const result = await this.mySqlDBC.query<DBISoldItems>(
        "SELECT * FROM SOLD_ITEMS"
      );
      const soldCarts: SoldCart[] = [];
      for (const soldItem of result) {
        const products = await this.purchaseItemProvider.findAllBy(soldItem.ID);
        const employee = await this.employeeProvider.find(soldItem.EMPLOYEE_ID);
        const customer = await this.customerProvider.find(soldItem.CUSTOMER_ID);
        soldCarts.push(
          new SoldCart(
            new Date(soldItem.DATE),
            soldItem.ID,
            employee,
            products,
            customer
          )
        );
      }
      return soldCarts;
    } catch (error) {
      throw new Error("Error while trying to find the sold carts");
    }
  }

  find(id: number): Promise<SoldCart> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBISoldItems>(`SELECT * FROM SOLD_ITEMS WHERE ID = ${id}`)
        .then(async (result) => {
          if (result.length === 0) {
            reject(new Error("Cart not found"));
          }
          const soldItem = result[0];
          const products = await this.purchaseItemProvider.findAllBy(
            soldItem.ID
          );
          const employee = await this.employeeProvider.find(
            soldItem.EMPLOYEE_ID
          );
          const customer = await this.customerProvider.find(
            soldItem.CUSTOMER_ID
          );
          resolve(
            new SoldCart(
              new Date(soldItem.DATE),
              soldItem.ID,
              employee,
              products,
              customer
            )
          );
        });
    });
  }
}
