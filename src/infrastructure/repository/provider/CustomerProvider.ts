import IProvider from "../../../domain/interfaces/infrastructure/repository/provider/IProvider";
import Customer from "../../../domain/model/customer/Customer";
import DBICustomer from "../../../domain/model/database/DBICustomer";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class CustomerProvider implements IProvider<Customer> {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAll(): Promise<Customer[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBICustomer>("SELECT * FROM CUSTOMER")
        .then((result) => {
          resolve(
            result.map((customer) => {
              return new Customer(
                customer.NAME,
                customer.LASTNAME,
                customer.PHONE,
                customer.EMAIL,
                customer.ID,
                customer.BILL_VIA
              );
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  find(id: number): Promise<Customer> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBICustomer>(`SELECT * FROM CUSTOMER WHERE ID = ${id}`)
        .then((result) => {
          if (result.length === 0) {
            reject(new Error("Customer not found"));
          }
          const customer = result[0];
          resolve(
            new Customer(
              customer.NAME,
              customer.LASTNAME,
              customer.PHONE,
              customer.EMAIL,
              customer.ID,
              customer.BILL_VIA
            )
          );
        });
    });
  }
}
