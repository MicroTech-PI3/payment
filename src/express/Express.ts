import express, { Application } from "express";
import ExpressEnvironment from "./config/ExpressEnvironment";
import ExpressRouter from "./routes/ExpressRouter";
import path from "path";

export default class Express {
  private readonly app: Application;
  private readonly env: ExpressEnvironment;

  constructor(private readonly expressRouter: ExpressRouter[]) {
    this.app = express();
    this.env = new ExpressEnvironment();
    this.config();
    this.routes();
  }

  public getApp = (): Application => {
    return this.app;
  };

  config = (): void => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "../frontend")));
  };

  routes = (): void => {
    this.expressRouter.forEach((router) => {
      this.app.use(router.path, router.router);
    });

    this.app.use((_req, res) => {
      res.status(404).send("404 Not Found");
    });
  };

  start = (): void => {
    this.app.listen(this.env.PORT, "0.0.0.0", () => {
      console.log(`Server is running on ${this.env.HOST}:${this.env.PORT}`);
    });
  };
}
