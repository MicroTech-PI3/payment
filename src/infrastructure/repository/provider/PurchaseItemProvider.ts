import IProvider from "../../../domain/interfaces/infrastructure/repository/provider/IProvider";
import DBISoldItemsProduct from "../../../domain/model/database/DBISoldItemsProduct";
import PurchaseItem from "../../../domain/model/purchaseItem/PurchaseItem";
import MySqlDBC from "../../../util/database/MySqlDBC";
import ProductProvider from "./ProductProvider";

export default class PurchaseItemProvider implements IProvider<PurchaseItem> {
  constructor(
    private readonly mySqlDBC: MySqlDBC,
    private readonly productProvider: ProductProvider
  ) {}

  findAllBy(id: number): Promise<PurchaseItem[]> {
    return new Promise((resolve, reject) => {
      this.mySqlDBC
        .query<DBISoldItemsProduct>(
          `SELECT * FROM SOLD_ITEMS_has_PRODUCT WHERE SOLD_ITEMS_ID = ${id}`
        )
        .then(async (result) => {
          if (result.length === 0) {
            reject(new Error("Purchase Item not found"));
          }
          const purchaseItems: PurchaseItem[] = [];
          for (const item of result) {
            const product = await this.productProvider.find(item.PRODUCT_ID);
            purchaseItems.push(new PurchaseItem(item.QUANTITY, product));
          }
          resolve(purchaseItems);
        });
    });
  }
}
