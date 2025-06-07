import { createEmptyRaceModel, RaceModel } from '../../models/race-model';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NGXLogger } from "ngx-logger";
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { StintcalculatorService } from '../../services/stintcalculator/stintcalculator.service';
import { RacemanagerComponent } from '../../components/racemanager/racemanager.component';
import { DrivermanagerComponent } from '../../components/drivermanager/drivermanager.component';
import { StatsComponent } from "../../components/stats/stats.component";
import { MillisToDurationPipe } from "../../pipes/millis-to-duration/millis-to-duration.pipe";
import { DriverModel } from '../../models/driver-model';
import { RacePlanModel } from '../../models/race-plan-model';
import { InputBufferComponent } from '../../components/input-buffer/input-buffer.component';

@Component({
  selector: 'app-stintlab',
  imports: [
    DatePipe,
    MillisToDurationPipe,
    FormsModule,
    TagModule,
    CardModule,
    PanelModule,
    TableModule,
    SelectModule,
    DrivermanagerComponent,
    RacemanagerComponent,
    StatsComponent,
    InputBufferComponent,
    DecimalPipe
],
  templateUrl: './stintlab.component.html',
  styleUrl: './stintlab.component.scss'
})
export class StintLabComponent implements OnInit {
  private static readonly RACE_STORAGE: string = "StintLab_raceModel";
  private static readonly DRIVER_STORAGE: string = "StintLab_driverModels";
  private static readonly PLAN_STORAGE: string = "StintLab_racePlan";

  drivers: DriverModel[] = [];
  race: RaceModel = createEmptyRaceModel();
  racePlan: RacePlanModel | undefined = undefined;
  showTable: boolean = false;
  validState: boolean = false;
  selectedDriver: DriverModel | undefined;

  constructor(
    private logger:NGXLogger,
    private localStorageServiceService:LocalStorageService,
    private stintcalculatorService:StintcalculatorService
  ){}

  ngOnInit(): void {
    var persistedRaceModel = this.localStorageServiceService.get<RaceModel>(StintLabComponent.RACE_STORAGE);
    
    if(persistedRaceModel){
      this.race = persistedRaceModel;
      this.race.raceStart = this.race.raceStart ? new Date(this.race.raceStart!) : undefined;
    }

    var persistedDriverModels = this.localStorageServiceService.get<DriverModel[]>(StintLabComponent.DRIVER_STORAGE);
    if(persistedDriverModels != null){
      this.drivers = persistedDriverModels;
    }

    var persistedRaceplan = this.localStorageServiceService.get<RacePlanModel>(StintLabComponent.PLAN_STORAGE);
    if(persistedRaceplan != null){
      this.racePlan = persistedRaceplan;
      this.showTable = true;
    }
    this.validateInputs();
  }

  persistAndCalculateStints() {
    this.persistDrivers();
    this.persistRace();
    this.calculateStints();
  }

  
  persistPlan(){
    if(this.racePlan != undefined){
      this.localStorageServiceService.set<RacePlanModel>(StintLabComponent.PLAN_STORAGE, this.racePlan!);
    }
  }
  
  updateDriver(driver: DriverModel, stintCounter: number){
    this.logger.info('changing driver to ' + driver.name + 'for stint ' + stintCounter);
    this.racePlan!.stints[stintCounter].driver = driver.name;
    this.calculateStints();
  }

  
  validateInputs() {
    if(this.drivers.length == 0){
      this.logger.info("no drivers found");
      this.validState = false;
      return;
    }
    for(let driver of this.drivers){
      if(!driver.name){
        this.logger.info("driver name invalid");
        this.validState = false;
        return;
      }
      if(!this.validNumber(driver.fuelConsumption)){
        this.logger.info("driver fuelConsumption invalid");
        this.validState = false;
        return;
      }
      if(!this.validNumber(driver.laptimeInMilliseconds)){
        this.logger.info("driver laptimeInMilliseconds invalid");
        this.validState = false;
        return;
      }
    }
    
    if(!this.race.raceStart){
      this.logger.info("race start invalid");
      this.validState = false;
      return;
    }
    if(!this.validNumber(this.race.raceDurationInMilliseconds)){
      this.logger.info("race raceDurationInMilliseconds invalid");
      this.validState = false;
      return;
    }
    if(!this.validNumber(this.race.fuelTankSizeInLiters)){
      this.logger.info("race fuelTankSize invalid");
      this.validState = false;
      return;
    }
    if(!this.validNumber(this.race.refuelRateInMillisecondsPerLiterRefueled)){
      this.logger.info("race refuelRate invalid");
      this.validState = false;
      return;
    }
    if(!this.validNumber(this.race.driveThroughInMilliseconds)){
      this.logger.info("race driveThrough invalid");
      this.validState = false;
      return;
    }
    this.validState = true;
  }
  
  private validNumber(input: number | undefined){
    return input != undefined && Number.isFinite(input) && input > 0;
  }
  
  private persistRace(){
    this.localStorageServiceService.set<RaceModel>(StintLabComponent.RACE_STORAGE, this.race);
  }
  
  private persistDrivers(){
    this.localStorageServiceService.set<DriverModel[]>(StintLabComponent.DRIVER_STORAGE, this.drivers);
  }
  
  calculateStints(){
    this.validateInputs();
    
    if(this.validState) {
      var driverPerStint: (DriverModel | undefined)[] = [];
      var driverNameToDriverMap: Map<string, DriverModel> = new Map();
      this.drivers.forEach(driver => driverNameToDriverMap.set(driver.name, driver));
      if(this.racePlan != undefined){
        driverPerStint = this.racePlan!.stints.map(d => d && d.driver? driverNameToDriverMap.get(d.driver) : undefined);
      }
  
      this.racePlan = this.stintcalculatorService.calculateStints(this.race, this.racePlan, driverPerStint, driverNameToDriverMap, this.drivers[0]);
      this.persistPlan();
      this.showTable = true;
    }
  }
}
