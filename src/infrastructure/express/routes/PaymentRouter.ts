import { Router } from "express";
import ExpressRouter from "../../../express/routes/ExpressRouter";
import PaymentController from "../controller/PaymentController";

export default class PaymentRouter implements ExpressRouter {
  router: Router;
  path: string;

  constructor(private readonly paymentController: PaymentController) {
    this.router = Router();
    this.path = "/payment";
    this.routes();
  }

  routes = (): void => {
    this.router.post(
      "/update/stock",
      this.paymentController.updateStock.bind(this.paymentController)
    );
  };
}
