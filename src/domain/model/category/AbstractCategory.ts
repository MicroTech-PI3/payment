export default abstract class AbstractCategory {
  constructor(
    protected name: string,
    protected description: string,
    protected id: number
  ) {}

  public getName() {
    return this.name;
  }

  public getDescription() {
    return this.description;
  }

  public getId() {
    return this.id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setId(id: number) {
    this.id = id;
  }

  public abstract isNull(): boolean;
}
