export default class Time {
  private readonly timeArray: string[];

  constructor(private time: string) {
    this.timeArray = this.time.split(":");
  }

  public getHours() {
    return parseInt(this.timeArray[0]);
  }

  public getMinutes() {
    return parseInt(this.timeArray[1]);
  }

  public getSeconds() {
    return parseInt(this.timeArray[2]);
  }

  public toString(): string {
    return this.time;
  }
}
