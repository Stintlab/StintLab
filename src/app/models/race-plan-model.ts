import { StintModel } from "./stint-model";

export class RacePlanModel {
  totalLapCount: number;
  raceEnd: Date;
  stints: StintModel[];

  constructor(totalLapCount: number, stints: StintModel[]) {
    this.totalLapCount = totalLapCount;
    this.raceEnd = stints[stints.length - 1].stintEndTime!;
    this.stints = stints;
  }
}
