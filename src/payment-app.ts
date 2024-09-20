import Express from "./express/Express";
import PaymentFactory from "./infrastructure/factory/PaymentFactory";

const paymentFactory = new PaymentFactory();
const [paymentRouter] = paymentFactory.createRouters();
const paymentApp = new Express([paymentRouter]);
paymentApp.start();
