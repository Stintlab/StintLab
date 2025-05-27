export class RaceModel {
  raceStart : Date;
  fuelTankSize: Number;
  driveThrough: Number;

  constructor(raceStart: Date, fuelTankSize: Number, driveThrough: Number){
    this.raceStart = raceStart;
    this.fuelTankSize = fuelTankSize;
    this.driveThrough = driveThrough;
  }
}
