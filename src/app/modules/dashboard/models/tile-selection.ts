export class TileSelection {
  key = Math.random().toString(32).substr(2);

  constructor(
    public tileKey: string,
    public props: any,
  ) { }
}