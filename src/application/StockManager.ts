import { ResultSetHeader } from "mysql2";
import IStockManager from "../domain/interfaces/application/IStockManager";
import ISoldCartRetriever from "../domain/interfaces/infrastructure/repository/retriever/ISoldCartRetriever";
import MySqlDBC from "../util/database/MySqlDBC";

export default class StockManager implements IStockManager {
  constructor(
    private readonly retrieveSoldCart: ISoldCartRetriever,
    private readonly mysqlDBC: MySqlDBC
  ) {}

  async updateStock(soldCartId: number): Promise<boolean> {
    try {
      const soldCart = await this.retrieveSoldCart.getSoldCart(soldCartId);
      let sqlQuery = "UPDATE PRODUCTS SET QUANTITY = CASE QUANTITY ";

      const purchasedItems = soldCart.getProducts();
      for (const product of purchasedItems) {
        sqlQuery += `WHEN ID = ${product.getProduct().getId()} THEN STOCK - ${product.getQuantity()} `;
      }
      sqlQuery += "ELSE NULL END";

      const [rows] = await this.mysqlDBC.query<ResultSetHeader>(sqlQuery);

      if (rows.affectedRows > 0) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
