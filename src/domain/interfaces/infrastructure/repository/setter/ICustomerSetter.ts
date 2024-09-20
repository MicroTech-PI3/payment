export default interface ICustomerSetter {
  updateBillVia(billVia: string, customerId: number): Promise<boolean>;
}
