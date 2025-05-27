export class DriverModel {
  name: string;
  fuelConsumption: string = "";
  laptime : string = "";
  isActive: boolean;

  constructor(name: string){
    this.name = name;
    this.isActive = true;
  }
}
