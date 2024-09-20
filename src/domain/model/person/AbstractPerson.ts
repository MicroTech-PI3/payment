export default abstract class AbstractPerson {
  constructor(
    protected name: string,
    protected lastName: string,
    protected phoneNumber: number,
    protected email: string,
    protected id: number
  ) {}

  public getName(): string {
    return this.name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPhoneNumber(): number {
    return this.phoneNumber;
  }

  public getEmail(): string {
    return this.email;
  }

  public getId(): number {
    return this.id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public setPhoneNumber(phoneNumber: number): void {
    this.phoneNumber = phoneNumber;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setId(id: number) {
    this.id = id;
  }

  public abstract isNull(): boolean;
}
