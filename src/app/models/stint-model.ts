import { DriverModel } from './driver-model';
export interface StintModel {
  counter: number;
  driver: string | undefined;
  stintStartTime: Date | undefined;
  laps: number | undefined;
  fuelUsed: number | undefined;
  timeDriven: number | undefined;
  timeInPitlane: number | undefined;
  refuelTime: number | undefined;
  totalStintLength: number | undefined;
  stintEndTime: Date | undefined;

  actualStintEndTime: Date | undefined;
  actualFuelUsed: number | undefined;
  actualLaps: number | undefined;
}