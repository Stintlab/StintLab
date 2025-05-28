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
    this.stints = [];
    if(!this.validateInputs()){
      this.logger.info("invalid Inputs, aborting stint calculation");
      return;
    }
    this.logger.info("valid inputs, calculating stints");
    var driver = this.drivers[0];

    var totalTime: number = this.race.raceDurationInMilliseconds!;
    var lapTime: number = driver.laptimeInMilliseconds!;
    var tankSize: number = this.race.fuelTankSize!;
    var fuelPerLap: number = driver.fuelConsumption!;
    var refuelRate: number = 10; //TODO add this to inputs
    var stopPenalty: number = this.race.driveThrough! * 1000;

    var totalLaps: number = 0;
    var stops: number = 0;
    var racingTime: number = 0;

    var lapsPerFullStint: number = Math.floor(tankSize / fuelPerLap);
    var stintRaceTime: number = lapsPerFullStint * lapTime;
    var refuelTankTime: number = Math.ceil(tankSize/refuelRate) * 1000;
    var fullStintTime: number = stintRaceTime + refuelTankTime + stopPenalty;
    while(racingTime + fullStintTime < totalTime){
      racingTime += fullStintTime;
      totalLaps += lapsPerFullStint;
      this.stints.push(new StintModel(++stops, driver, lapsPerFullStint));
    }
    var remainingTime: number = totalTime - racingTime;
    var atleastRemainingLaps = Math.floor(remainingTime / lapTime);
    var fuelForAtLeastRemainingLaps = fuelPerLap * atleastRemainingLaps;
    var refuelTimeForAtleastRemainingLaps = stopPenalty + Math.ceil(fuelForAtLeastRemainingLaps / refuelRate);
    var atleastRemainingRaceTime = lapTime * atleastRemainingLaps + refuelTimeForAtleastRemainingLaps;

    if(remainingTime > atleastRemainingRaceTime){
      atleastRemainingLaps+= 1;
    }
    fuelForAtLeastRemainingLaps = fuelPerLap * atleastRemainingLaps;
    refuelTimeForAtleastRemainingLaps = stopPenalty + Math.ceil(fuelForAtLeastRemainingLaps / refuelRate);
    atleastRemainingRaceTime = lapTime * atleastRemainingLaps + refuelTimeForAtleastRemainingLaps;

    racingTime += atleastRemainingRaceTime;
    totalLaps += atleastRemainingLaps;
    this.stints.push(new StintModel(++stops, driver, atleastRemainingLaps));
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
