import { Request, Response } from "express";
import IStockManager from "../../../domain/interfaces/application/IStockManager";

export default class PaymentController {
  constructor(private readonly stockManager: IStockManager) {}

  public async updateStock(req: Request, res: Response): Promise<void> {
    try {
      const { soldCartId } = req.body;
      const bill = await this.stockManager.updateStock(soldCartId);
      res
        .status(200)
        .json({ message: bill ? "Stock updated" : "Stock not updated" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
