import AbstractPerson from "./AbstractPerson";

export default abstract class NullAbstractPerson extends AbstractPerson {
  constructor() {
    super("Name not found", "Last name not found", 0o0, "Email not found", -1);
  }

  public setName(): void {
    return;
  }

  public setEmail(): void {
    return;
  }

  public setLastName(): void {
    return;
  }

  public setPhoneNumber(): void {
    return;
  }

  public setId(): void {
    return;
  }

  public isNull(): boolean {
    return true;
  }
}
