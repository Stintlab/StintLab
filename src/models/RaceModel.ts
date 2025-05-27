export class RaceModel {
  raceStart : string;
  fuelTankSize: Number;
  driveThrough: Number;

  constructor(raceStart: string, fuelTankSize: Number, driveThrough: Number){
    this.raceStart = raceStart;
    this.fuelTankSize = fuelTankSize;
    this.driveThrough = driveThrough;
  }
}
