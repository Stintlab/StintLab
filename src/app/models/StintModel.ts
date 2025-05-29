import { DriverModel } from './DriverModel';
export class StintModel {
  counter: number;
  driver: DriverModel | undefined;
  laps: number | undefined;
  fuelUsed: number | undefined;
  timeDriven: number | undefined;
  timeInPitlane: number | undefined;
  refuelTime: number | undefined;
  totalStintLength: number | undefined;
  stintEndTime: Date | undefined;

  constructor(counter: number){
    this.counter = counter;
  }
}
