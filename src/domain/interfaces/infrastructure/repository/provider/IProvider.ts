export default interface IProvider<T> {
  find?(id: number): Promise<T>;
  findAll?(): Promise<T[]>;
  findAllBy?(id: number): Promise<T[]>;
}
