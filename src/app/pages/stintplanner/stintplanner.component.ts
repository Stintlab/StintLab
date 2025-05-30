import { LocalStorageServiceService } from './../../services/localstorageservice/LocalStorageService.service';
import { PanelModule } from 'primeng/panel';
import { StintcalculatorService } from './../../services/stintcalculator/stintcalculator.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SelectItem, SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { NGXLogger } from "ngx-logger";
import { RacemanagerComponent } from '../../components/racemanager/racemanager.component';
import { DrivermanagerComponent } from '../../components/drivermanager/drivermanager.component';
import { DriverModel } from '../../models/DriverModel';
import { RaceModel } from '../../models/RaceModel';
import { RacePlanModel } from '../../models/RacePlanModel';
import { MillisToDurationPipe } from "../../pipes/millisToDuration/millisToDuration.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stintplanner',
  imports: [
    CardModule,
    PanelModule,
    TableModule,
    DrivermanagerComponent,
    RacemanagerComponent,
    MillisToDurationPipe,
    DecimalPipe,
    FormsModule,
    SelectModule,
    TagModule
],
  templateUrl: './stintplanner.component.html',
  styleUrl: './stintplanner.component.scss'
})
export class StintplannerComponent implements OnInit {
  private static readonly RACE_STORAGE: string = "Stintplanner_raceModel";
  private static readonly DRIVER_STORAGE: string = "Stintplanner_driverModels";
  private static readonly PLAN_STORAGE: string = "Stintplanner_racePlan";

  drivers: DriverModel[] = [];
  race: RaceModel = new RaceModel();
  racePlan: RacePlanModel | undefined = undefined;
  showTable: boolean = false;
  selectedDriver: DriverModel | undefined;

  constructor(
    private logger:NGXLogger,
    private localStorageServiceService:LocalStorageServiceService,
    private stintcalculatorService:StintcalculatorService
  ){}

  ngOnInit(): void {
    var persistedRaceModel = this.localStorageServiceService.get<RaceModel>(StintplannerComponent.RACE_STORAGE);
    if(persistedRaceModel != null){
      this.race = persistedRaceModel;
      this.race.raceStart = new Date(this.race.raceStart!);
    }

    var persistedDriverModels = this.localStorageServiceService.get<DriverModel[]>(StintplannerComponent.DRIVER_STORAGE);
    if(persistedDriverModels != null){
      this.drivers = persistedDriverModels;
    }

    var persistedRaceplan = this.localStorageServiceService.get<RacePlanModel>(StintplannerComponent.PLAN_STORAGE);
    if(persistedRaceplan != null){
      this.racePlan = persistedRaceplan;
      this.showTable = true;
    }
  }

  persistRace(){
    this.localStorageServiceService.set<RaceModel>(StintplannerComponent.RACE_STORAGE, this.race);
  }
  persistDrivers(){
    this.localStorageServiceService.set<DriverModel[]>(StintplannerComponent.DRIVER_STORAGE, this.drivers);
  }
  persistPlan(){
    if(this.racePlan != undefined){
      this.localStorageServiceService.set<RacePlanModel>(StintplannerComponent.PLAN_STORAGE, this.racePlan!);
    }
  }

  updateDriver(driver: DriverModel, stintCounter: number){
    this.logger.info('changing driver to ' + driver.name + 'for stint ' + stintCounter);
    this.racePlan!.stints[stintCounter].driver = driver;
  }

  calculateStints(){
    if(this.validateInputs(this.drivers, this.race)) {
      var driverPerStintList: DriverModel[] = [];
      if(this.racePlan != undefined){
        driverPerStintList = this.racePlan!.stints
        .filter(d => d.driver != undefined && this.drivers.includes(d.driver))
        .map(d => d.driver!);
      }

      this.racePlan = this.stintcalculatorService.calculateStints(this.race, driverPerStintList, this.drivers[0]);
      this.persistPlan();
      this.showTable = true;
    }
  }

  private validateInputs(drivers: DriverModel[], race: RaceModel) : boolean {
    if(drivers.length == 0){
      this.logger.info("no drivers found");
      return false;
    }
    for(let driver of drivers){
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

    if(!race.raceStart){
      this.logger.info("race start invalid");
      return false;
    }
    if(race.raceDurationInMilliseconds == undefined || race.raceDurationInMilliseconds < 0){
      this.logger.info("race raceDurationInMilliseconds invalid");
      return false;
    }
    if(race.fuelTankSizeInLiters == undefined || race.fuelTankSizeInLiters < 0){
      this.logger.info("race fuelTankSize invalid");
      return false;
    }
    if(race.driveThroughInMilliseconds == undefined || race.driveThroughInMilliseconds < 0){
      this.logger.info("race driveThrough invalid");
      return false;
    }
    return true;
  }

}
