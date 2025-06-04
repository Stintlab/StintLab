export interface RaceModel {
  raceStart : Date;
  raceDurationInMilliseconds: number | undefined;
  fuelTankSizeInLiters: number | undefined;
  refuelRateInMillisecondsPerLiterRefueled: number | undefined;
  driveThroughInMilliseconds: number | undefined;
}

export function createEmptyRaceModel(): RaceModel {
    return {
      raceStart: new Date(),
      raceDurationInMilliseconds: undefined,
      fuelTankSizeInLiters: undefined,
      refuelRateInMillisecondsPerLiterRefueled: undefined,
      driveThroughInMilliseconds: undefined
    } as RaceModel;
  }
