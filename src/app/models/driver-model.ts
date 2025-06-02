export class DriverModel {
  name: string;
  fuelConsumption: number | undefined;
  laptimeInMilliseconds: number | undefined;

  constructor(name: string){
    this.name = name;
  }
}
