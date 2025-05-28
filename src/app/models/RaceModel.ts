export class RaceModel {
  raceStart : Date | undefined = new Date();
  raceDurationInMilliseconds: number | undefined = 14400000;
  fuelTankSize: number | undefined = 100;
  refuelRate: number | undefined = 10;
  driveThrough: number | undefined = 25;
}
