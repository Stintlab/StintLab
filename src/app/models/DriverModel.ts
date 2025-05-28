export class DriverModel {
  name: string;
  fuelConsumption: number | undefined;
  laptime: number | undefined;

  constructor(name: string){
    this.name = name;
  }
}
