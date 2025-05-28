export class DriverModel {
  name: string;
  fuelConsumption: number | undefined = 10;
  laptimeInMilliseconds: number | undefined = 60000;

  constructor(name: string){
    this.name = name;
  }
}
