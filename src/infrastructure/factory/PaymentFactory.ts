import StockManager from "../../application/StockManager";
import ExpressRouter from "../../express/routes/ExpressRouter";
import DatabaseEnvironment from "../../util/database/config/DatabaseEnvironment";
import MySqlDBC from "../../util/database/MySqlDBC";
import MySqlConnectionConfig from "../../util/database/types/ConnectionInterface";
import PaymentController from "../express/controller/PaymentController";
import PaymentRouter from "../express/routes/PaymentRouter";
import CategoryProvider from "../repository/provider/CategoryProvider";
import CustomerProvider from "../repository/provider/CustomerProvider";
import EmployeeProvider from "../repository/provider/EmployeeProvider";
import ProductProvider from "../repository/provider/ProductProvider";
import PurchaseItemProvider from "../repository/provider/PurchaseItemProvider";
import SoldCartProvider from "../repository/provider/SoldCartProvider";
import SupplierProvider from "../repository/provider/SupplierProvider";
import SoldCartRetriever from "../repository/retriever/SoldCartRetriever";

export default class PaymentFactory {
  public createRouters(): ExpressRouter[] {
    //MySQL
    const databaseEnvironment = new DatabaseEnvironment();
    const mySqlConnectionConfig: MySqlConnectionConfig = {
      host: databaseEnvironment.DB_HOST,
      user: databaseEnvironment.DB_USER,
      password: databaseEnvironment.DB_PASSWORD,
      database: databaseEnvironment.DATABASE,
      port: databaseEnvironment.DB_PORT,
    };
    const mySqlDbc = new MySqlDBC(mySqlConnectionConfig);

    //Providers
    const customerProvider = new CustomerProvider(mySqlDbc);
    const categoryProvider = new CategoryProvider(mySqlDbc);
    const supplierProvider = new SupplierProvider(mySqlDbc);
    const productProvider = new ProductProvider(
      mySqlDbc,
      categoryProvider,
      supplierProvider
    );
    const purchaseItemProvider = new PurchaseItemProvider(
      mySqlDbc,
      productProvider
    );
    const employeeProvider = new EmployeeProvider(mySqlDbc);
    const soldCartProvider = new SoldCartProvider(
      mySqlDbc,
      purchaseItemProvider,
      employeeProvider,
      customerProvider
    );

    //Repository
    const soldCartRetriever = new SoldCartRetriever(soldCartProvider);

    const stockManager = new StockManager(soldCartRetriever, mySqlDbc);

    //Controller
    const paymentController = new PaymentController(stockManager);

    //Router
    const paymentRouter = new PaymentRouter(paymentController);

    return [paymentRouter];
  }
}
