export class DriverModel {
  name: string;
  fuelConsumption: number;
  laptime : string;
  isActive: boolean;

  constructor(name: string, fuelConsumption: number, laptime: string, isActive: boolean){
    this.name = name;
    this.fuelConsumption = fuelConsumption;
    this.laptime = laptime;
    this.isActive = isActive;
  }
}
