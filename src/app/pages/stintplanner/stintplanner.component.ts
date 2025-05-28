import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from "ngx-logger";
import { RacemanagerComponent } from '../../components/racemanager/racemanager.component';
import { DrivermanagerComponent } from '../../components/drivermanager/drivermanager.component';
import { DriverModel } from '../../models/DriverModel';
import { RaceModel } from '../../models/RaceModel';
import { StintModel } from '../../models/StintModel';

@Component({
  selector: 'app-stintplanner',
  imports: [
    PanelModule,
    TableModule,
    DrivermanagerComponent,
    RacemanagerComponent
  ],
  templateUrl: './stintplanner.component.html',
  styleUrl: './stintplanner.component.scss'
})
export class StintplannerComponent implements OnInit {
  drivers: DriverModel[] = [];
  race: RaceModel = new RaceModel();
  stints: StintModel[] = [];
  logger: NGXLogger;

  constructor(logger: NGXLogger){
    this.logger = logger;
  }

  ngOnInit(): void {
  }

  calculateStints(){
    //build driver name to model map
    var driverNamesToModels: Map<String, DriverModel> = new Map();
    this.drivers.forEach(d => driverNamesToModels.set(d.name, d));

    //fetch previously defined drivers for each stint
    var stintDrivers: string[] = this.stints
      .filter(s => s.driver != undefined)
      .map(s => s.driver!.name!);

    //reset current stints
    this.stints = [];
    if(!this.validateInputs()){
      this.logger.info("invalid Inputs, aborting stint calculation");
      return;
    }
    this.logger.info("valid inputs, calculating stints");
    var totalTime: number = this.race.raceDurationInMilliseconds!;
    var tankSize: number = this.race.fuelTankSize!;
    var refuelRate: number = this.race.refuelRate!;
    //as this field is linked to an input, its converted to millis here
    var stopPenalty: number = this.race.driveThrough! * 1000;
    var refuelTankTime: number = Math.ceil(tankSize/refuelRate) * 1000;
    //TODO calculate first stint without refueling so the refuel time is calculated for the upcoming sprint, not the one just completed
    var totalLaps: number = 0;
    var stintCounter: number = 0;
    var racingTime: number = 0;
    var driver: DriverModel = this.getOrDefaultDriver(stintDrivers, driverNamesToModels, stintCounter);;
    var lapsPerFullStint: number = Math.floor(tankSize / driver.fuelConsumption!);
    var stintRaceTime: number = lapsPerFullStint * driver.laptimeInMilliseconds!;
    var fullStintTime: number = stintRaceTime + refuelTankTime + stopPenalty;
    while(racingTime + fullStintTime < totalTime){
      racingTime += fullStintTime;
      totalLaps += lapsPerFullStint;
      this.stints.push(new StintModel(stintCounter, driver, lapsPerFullStint));
      stintCounter++;
      driver = this.getOrDefaultDriver(stintDrivers, driverNamesToModels, stintCounter);
      lapsPerFullStint = Math.floor(tankSize / driver.fuelConsumption!);
      stintRaceTime = lapsPerFullStint * driver.laptimeInMilliseconds!;
      fullStintTime = stintRaceTime + refuelTankTime + stopPenalty;
    }
    var remainingTime: number = totalTime - racingTime;
    //if the race ends perfectly, we dont need to calculate another partial stint
    if(remainingTime <= 0){
      return;
    }
    var remainingLaps = Math.floor(remainingTime / driver.laptimeInMilliseconds!);
    var fuelNeededForRemainingLaps = driver.fuelConsumption! * remainingLaps;
    var refuelTimeForRemainingLaps = stopPenalty + Math.ceil(fuelNeededForRemainingLaps * 1000 / refuelRate) ;
    var remainingRaceTime = driver.laptimeInMilliseconds! * remainingLaps + refuelTimeForRemainingLaps;

    if(remainingTime > remainingRaceTime){
      remainingLaps+= 1;
    }
    fuelNeededForRemainingLaps = driver.fuelConsumption! * remainingLaps;
    refuelTimeForRemainingLaps = stopPenalty + Math.ceil(fuelNeededForRemainingLaps / refuelRate);
    remainingRaceTime = driver.laptimeInMilliseconds! * remainingLaps + refuelTimeForRemainingLaps;

    racingTime += remainingRaceTime;
    totalLaps += remainingLaps;
    this.stints.push(new StintModel(++stintCounter, driver, remainingLaps));
  }

  private getOrDefaultDriver(stintDrivers: string[], driverNamesToModels: Map<String, DriverModel>, stintCounter: number) : DriverModel {
    if(stintDrivers.length <= stintCounter){
      return this.drivers[0];
    }
    var driverName: string = stintDrivers[stintCounter];
    var driverModel: DriverModel | undefined = driverNamesToModels.get(driverName);
    if(driverModel == undefined){
      return this.drivers[0];
    }
    return driverModel!;
  }

  private validateInputs() : boolean {
    if(this.drivers.length == 0){
      this.logger.info("no drivers found");
      return false;
    }
    for(let driver of this.drivers){
      if(!driver.name){
        this.logger.info("driver name invalid");
        return false;
      }
      if(driver.fuelConsumption == undefined || driver.fuelConsumption < 0){
        this.logger.info("driver fuelConsumption invalid");
        return false;
      }
      if(driver.laptimeInMilliseconds == undefined || driver.laptimeInMilliseconds < 0){
        this.logger.info("driver laptimeInMilliseconds invalid");
        return false;
      }
    }

    if(!this.race.raceStart){
      this.logger.info("race start invalid");
      return false;
    }
    if(this.race.raceDurationInMilliseconds == undefined || this.race.raceDurationInMilliseconds < 0){
      this.logger.info("race raceDurationInMilliseconds invalid");
      return false;
    }
    if(this.race.fuelTankSize == undefined || this.race.fuelTankSize < 0){
      this.logger.info("race fuelTankSize invalid");
      return false;
    }
    if(this.race.driveThrough == undefined || this.race.driveThrough < 0){
      this.logger.info("race driveThrough invalid");
      return false;
    }
    return true;
  }
}
