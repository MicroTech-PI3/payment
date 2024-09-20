import IProvider from "../../../domain/interfaces/infrastructure/repository/provider/IProvider";
import DBISupplier from "../../../domain/model/database/DBISupplier";
import Supplier from "../../../domain/model/supplier/Supplier";
import MySqlDBC from "../../../util/database/MySqlDBC";

export default class SupplierProvider implements IProvider<Supplier> {
  constructor(private readonly mySqlDBC: MySqlDBC) {}

  async findAll(): Promise<Supplier[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBISupplier>("SELECT * FROM SUPPLIER")
        .then((result) => {
          resolve(
            result.map((supplier) => {
              return new Supplier(
                supplier.NAME,
                supplier.LASTNAME,
                supplier.PHONE,
                supplier.EMAIL,
                supplier.ID,
                supplier.CITY,
                supplier.BRAND
              );
            })
          );
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  find(id: number): Promise<Supplier> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBISupplier>(`SELECT * FROM SUPPLIER WHERE ID = ${id}`)
        .then((result) => {
          if (result.length === 0) {
            reject(new Error("Supplier not found"));
          }
          const supplier = result[0];
          resolve(
            new Supplier(
              supplier.NAME,
              supplier.LASTNAME,
              supplier.PHONE,
              supplier.EMAIL,
              supplier.ID,
              supplier.CITY,
              supplier.BRAND
            )
          );
        });
    });
  }
}
