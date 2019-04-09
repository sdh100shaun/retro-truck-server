export class Truck {
  constructor(
    private id: number,
    private type: string,
    private _owner: string
  ) {}

  get owner(){
      return this._owner;
  }
  /**
   * save
   */
  public save() {}
}
