import { DriverModel } from './DriverModel';
export class StintModel {
  counter: number;
  driver: DriverModel | undefined;
  laps: number | undefined;

  constructor(counter: number, driver: DriverModel, laps: number){
    this.counter = counter;
    this.driver = driver;
    this.laps = laps;
  }
}
