import { StintModel } from "./stint-model";

export class RacePlanModel {
  totalLapCount: number;
  stints: StintModel[];
  
  constructor(totalLapCount: number, stints: StintModel[]) {
    this.totalLapCount = totalLapCount;
    this.stints = stints;
  }

  get raceEnd(): Date {
    return this.stints[this.stints.length - 1].stintEndTime!;
  }
}
