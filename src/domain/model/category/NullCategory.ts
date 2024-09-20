import AbstractCategory from "./AbstractCategory";

export default class NullCategory extends AbstractCategory {
  constructor() {
    super("Name not found", "Description not found", -1);
  }

  public isNull(): boolean {
    return true;
  }

  public setName() {
    return;
  }

  public setDescription() {
    return;
  }

  public setId() {
    return;
  }
}
