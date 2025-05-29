export class RaceModel {
  raceStart : Date | undefined = new Date();
  raceDurationInMilliseconds: number | undefined;
  fuelTankSizeInLiters: number | undefined;
  refuelRateInMillisecondsPerLiterRefueled: number | undefined;
  driveThroughInMilliseconds: number | undefined;
}
