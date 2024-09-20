export default interface IStockManager {
  updateStock(soldCartId: number): Promise<boolean>;
}
