import { DriverModel } from '../../models/driver-model';
import { Injectable } from '@angular/core';
import { StintModel } from '../../models/stint-model';
import { RaceModel } from '../../models/race-model';
import { NGXLogger } from 'ngx-logger';
import { RacePlanModel } from '../../models/race-plan-model';

@Injectable({
  providedIn: 'root'
})
export class StintcalculatorService {

constructor(private logger: NGXLogger) { }

  calculateStints(race: RaceModel, drivers: DriverModel[], defaultDriver: DriverModel) : RacePlanModel {
    //prepare some calc values
    var stintCounter = 0;
    var stints: StintModel[] = [];
    var stintStartTime: Date = race.raceStart!;
    var raceEndTime: Date = new Date(race.raceStart!.getTime() + race.raceDurationInMilliseconds!);
    var fullRefillTime: number = Math.ceil(race.fuelTankSizeInLiters! * race.refuelRateInMillisecondsPerLiterRefueled!);

    //calculate the first full stint, as the car is filled before the race, no need to calculate time in the pitlane
    var driver: DriverModel = this.getOrDefault(drivers, stintCounter, defaultDriver);
    var lapsInFullStint = Math.floor(race.fuelTankSizeInLiters! / driver.fuelConsumption!);
    var fuelUsed = lapsInFullStint * driver.fuelConsumption!;
    var stintRaceTime = lapsInFullStint * driver.laptimeInMilliseconds!;
    var refuelTime = 0;
    var timeInPitlane = 0;
    var stintTime = stintRaceTime;
    var stintEndTime: Date = new Date(stintStartTime.getTime() + stintTime);

    //check if the last calculated full stint ends before the race does, if so, add it to the plan and calculate another one
    while(raceEndTime > stintEndTime){
      var stint = new StintModel(stintCounter);
      stint.driver = driver;
      stint.laps = lapsInFullStint;
      stint.stintStartTime = stintStartTime;
      stint.fuelUsed = fuelUsed;
      stint.timeInPitlane = timeInPitlane;
      stint.refuelTime = refuelTime;
      stint.timeDriven = stintRaceTime;
      stint.totalStintLength = stintTime;
      stint.stintEndTime = stintEndTime;
      stints.push(stint);

      stintCounter++;
      stintStartTime = stintEndTime;
      driver = this.getOrDefault(drivers, stintCounter, defaultDriver);
      lapsInFullStint = Math.floor(race.fuelTankSizeInLiters! / driver.fuelConsumption!);
      fuelUsed = lapsInFullStint * driver.fuelConsumption!;
      stintRaceTime = lapsInFullStint * driver.laptimeInMilliseconds!;
      refuelTime = fullRefillTime;
      timeInPitlane = race.driveThroughInMilliseconds! + refuelTime;
      stintTime = stintRaceTime + timeInPitlane;
      stintEndTime = new Date(stintStartTime.getTime() + stintTime);
    }

    /*
      at this point we know its not an entire stint to the end anymore
      but the while loop has already calculated another full stint and during that increased the stintCounter and fetched the new driver,
      so we just have to find out, how long to drive and how much to refuel to reach the end

      we increment the amount of laps driven and fueled and see if we reach the end of the race this way
    */
    var remainingLaps = 0;
    do {
      remainingLaps++;
      fuelUsed = remainingLaps * driver.fuelConsumption!;
      stintRaceTime = remainingLaps * driver.laptimeInMilliseconds!;
      if(stints.length != 0){
        refuelTime = Math.ceil(fuelUsed * race.refuelRateInMillisecondsPerLiterRefueled!);
        timeInPitlane = race.driveThroughInMilliseconds! + refuelTime;
      }
      else{
        refuelTime = 0;
        timeInPitlane = 0;
      }
      stintTime = stintRaceTime + timeInPitlane;
      stintEndTime = new Date(stintStartTime.getTime() + stintTime);
    }
    while(raceEndTime > stintEndTime);

    var stint = new StintModel(stintCounter);
    stint.driver = driver;
    stint.laps = remainingLaps;
    stint.stintStartTime = stintStartTime;
    stint.fuelUsed = fuelUsed;
    stint.timeInPitlane = timeInPitlane;
    stint.refuelTime = refuelTime;
    stint.timeDriven = stintRaceTime;
    stint.totalStintLength = stintTime;
    stint.stintEndTime = stintEndTime;
    stints.push(stint);
    var totalLaps = (stintCounter - 1) * lapsInFullStint + remainingLaps;
    return new RacePlanModel(totalLaps, stints);
  }


  private getOrDefault<T>(array: T[], index: number, fallback: T) : T {
    if(array.length > index){
      return array[index];
    }
    return fallback;
  }
}
