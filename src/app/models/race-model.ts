export interface RaceModel {
  raceStart : Date | undefined;
  raceDurationInMilliseconds: number | undefined;
  fuelTankSizeInLiters: number | undefined;
  refuelRateInMillisecondsPerLiterRefueled: number | undefined;
  driveThroughInMilliseconds: number | undefined;
}

export function createEmptyRaceModel(): RaceModel {
    return {
      raceStart: undefined,
      raceDurationInMilliseconds: undefined,
      fuelTankSizeInLiters: undefined,
      refuelRateInMillisecondsPerLiterRefueled: undefined,
      driveThroughInMilliseconds: undefined
    } as RaceModel;
  }
