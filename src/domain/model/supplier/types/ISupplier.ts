export default interface ISupplier {
  city: string;
  brand: string;
  getCity(): string;
  getBrand(): string;
  setCity(city: string): void;
  setBrand(brand: string): void;
}
