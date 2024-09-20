export default interface IEmployee {
  address: string;
  getAddress(): string;
  setAddress(address: string): void;
}
