export default interface ICustomer {
  billVia: string;
  getBillVia(): string;
  setBillVia(billVia: string): void;
}
