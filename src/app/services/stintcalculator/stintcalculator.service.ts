import { DriverModel } from "../../models/driver-model";
import { Injectable } from "@angular/core";
import { StintModel } from "../../models/stint-model";
import { RaceModel } from "../../models/race-model";
import { RacePlanModel } from "../../models/race-plan-model";

@Injectable({
  providedIn: "root",
})
export class StintcalculatorService {
  constructor() {}

  calculateStints(
    race: RaceModel,
    currentRacePlan: RacePlanModel | undefined,
    driverPerStint: (DriverModel | undefined)[],
    allDrivers: Map<string, DriverModel>,
    defaultDriver: DriverModel
  ): RacePlanModel {
    //prepare some calc values
    var stintCounter = 0;
    var stints: StintModel[] = [];
    var stintStartTime: Date = race.raceStart!;
    var raceEndTime: Date = new Date(
      race.raceStart!.getTime() + race.raceDurationInMilliseconds!
    );
    // var fullRefillTime: number = Math.ceil(race.fuelTankSizeInLiters! * race.refuelRateInMillisecondsPerLiterRefueled!);
    const refuelTimePerLiter = race.refuelRateInMillisecondsPerLiterRefueled!;
    const fuelTankSize = race.fuelTankSizeInLiters!;
    var fuel = fuelTankSize;

    //calculate the first full stint, as the car is filled before the race, no need to calculate time in the pitlane
    var nextStint = this.recalculateNextStint(
      currentRacePlan,
      stintCounter,
      defaultDriver,
      driverPerStint,
      stintStartTime,
      fuel,
      fuelTankSize,
      refuelTimePerLiter,
      0
    );
    fuel -= nextStint.actualFuelUsed ?? nextStint.fuelUsed!;

    //check if the last calculated full stint ends before the race does, if so, add it to the plan and calculate another one
    while (raceEndTime > nextStint.stintEndTime!) {
      stints.push(nextStint);

      stintCounter++;
      stintStartTime = nextStint.stintEndTime!;
      nextStint = this.recalculateNextStint(
        currentRacePlan,
        stintCounter,
        defaultDriver,
        driverPerStint,
        stintStartTime,
        fuel,
        fuelTankSize,
        refuelTimePerLiter,
        race.driveThroughInMilliseconds!
      );
      fuel = fuelTankSize - (nextStint.actualFuelUsed ?? nextStint.fuelUsed!);
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
      var nextDriver = allDrivers.get(nextStint.driver!)!;
      nextStint.fuelUsed = remainingLaps * nextDriver.fuelConsumption!;
      nextStint.timeDriven = remainingLaps * nextDriver.laptimeInMilliseconds!;
      if (stints.length != 0) {
        nextStint.refuelTime = Math.ceil(nextStint.fuelUsed * race.refuelRateInMillisecondsPerLiterRefueled!);
        nextStint.timeInPitlane = race.driveThroughInMilliseconds! + nextStint.refuelTime;
      } else {
        nextStint.refuelTime = 0;
        nextStint.timeInPitlane = 0;
      }
      nextStint.totalStintLength = nextStint.timeDriven + nextStint.timeInPitlane;
      nextStint.stintEndTime = new Date(stintStartTime.getTime() + nextStint.timeDriven + nextStint.timeInPitlane);
    } while (raceEndTime > nextStint.stintEndTime);

    nextStint.laps = nextStint.actualLaps ?? remainingLaps;
    stints.push(nextStint);
    var totalLaps = stints
      .map(stint => stint.actualLaps ?? stint.laps!)
      .reduce((prev, cur) => prev + cur);
    return new RacePlanModel(totalLaps, stints);
  }

  private recalculateNextStint(
    currentRacePlan: RacePlanModel | undefined,
    stintCounter: number,
    defaultDriver: DriverModel,
    driverPerStint: (DriverModel | undefined)[],
    stintStartTime: Date,
    fuel: number,
    tankSize: number,
    refuelTimePerLiter: number,
    timeToPassPitlane: number
  ): StintModel {
    var refuelTime = Math.floor((tankSize - fuel) * refuelTimePerLiter);
    var driver = this.getOrDefault(driverPerStint, stintCounter, defaultDriver);
    var lapsInFullStint = this.getFromRaceplan(
      currentRacePlan,
      (rp) => rp.stints[stintCounter]?.actualLaps,
      Math.floor(tankSize / driver.fuelConsumption!)
    );
    var timeDriven = lapsInFullStint.value * driver.laptimeInMilliseconds!;

    var fuelUsed = this.getFromRaceplan(
      currentRacePlan,
      (rp) => rp.stints[stintCounter]?.actualFuelUsed,
      lapsInFullStint.value * driver.fuelConsumption!
    );

    var stintEndTime = this.getFromRaceplan<Date>(
      currentRacePlan,
      (rp) => rp.stints[stintCounter]?.actualStintEndTime,
      new Date(stintStartTime.getTime() + timeDriven + timeToPassPitlane + refuelTime)
    );
    if (stintEndTime.accessed) {
      timeDriven = Math.floor(
        stintEndTime.accessed.getTime() -
          stintStartTime.getTime() -
          timeToPassPitlane -
          refuelTime
      );
    }

    return {
      counter: stintCounter,
      driver: driver.name,
      laps: lapsInFullStint.value,
      stintStartTime: stintStartTime,
      stintEndTime: stintEndTime.value,
      fuelUsed: fuelUsed.value,
      timeInPitlane: timeToPassPitlane + refuelTime,
      refuelTime: refuelTime,
      timeDriven: timeDriven,
      totalStintLength: timeDriven + timeToPassPitlane + refuelTime,
      actualFuelUsed: fuelUsed.accessed,
      actualLaps: lapsInFullStint.accessed,
      actualStintEndTime: stintEndTime.accessed,
    };
  }

  private getFromRaceplan<T>(
    racePlan: RacePlanModel | undefined,
    accessor: (rp: RacePlanModel) => T | undefined,
    fallback: T
  ): { value: T; accessed: T | undefined } {
    if (!racePlan) {
      return { value: fallback, accessed: undefined };
    }
    var accessed = accessor(racePlan);
    return { value: accessed ?? fallback, accessed: accessed };
  }

  private getOrDefault<T>(array: (T | undefined)[], index: number, fallback: T): T {
    return (array.length > index && array[index])? array[index] : fallback;
  }
}
