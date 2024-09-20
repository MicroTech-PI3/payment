import IProvider from "../../../domain/interfaces/infrastructure/repository/provider/IProvider";
import DBIProduct from "../../../domain/model/database/DBIProduct";
import Product from "../../../domain/model/product/Product";
import MySqlDBC from "../../../util/database/MySqlDBC";
import CategoryProvider from "./CategoryProvider";
import SupplierProvider from "./SupplierProvider";

export default class ProductProvider implements IProvider<Product> {
  constructor(
    private readonly mySqlDBC: MySqlDBC,
    private readonly categoryProvider: CategoryProvider,
    private readonly supplierProvider: SupplierProvider
  ) {}

  async findAll(): Promise<Product[]> {
    try {
      const result = await this.mySqlDBC.query<DBIProduct>(
        "SELECT * FROM PRODUCT"
      );
      const products: Product[] = [];
      for (const product of result) {
        const category = await this.categoryProvider.find(product.CATEGORY_ID);
        const supplier = await this.supplierProvider.find(product.SUPPLIER_ID);
        const newProduct = new Product(
          product.NAME,
          product.PRICE,
          product.DESCRIPTION,
          product.QUANTITY,
          supplier,
          category,
          product.ID
        );
        products.push(newProduct);
      }
      return products;
    } catch (error) {
      throw new Error("Error while trying to find products");
    }
  }

  find(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBIProduct>(`SELECT * FROM PRODUCT WHERE ID = ${id}`)
        .then(async (result) => {
          if (result.length === 0) {
            reject(new Error("Product not found"));
          }
          const product = result[0];
          const category = await this.categoryProvider.find(
            product.CATEGORY_ID
          );
          const supplier = await this.supplierProvider.find(
            product.SUPPLIER_ID
          );
          resolve(
            new Product(
              product.NAME,
              product.PRICE,
              product.DESCRIPTION,
              product.QUANTITY,
              supplier,
              category,
              product.ID
            )
          );
        });
    });
  }
}
