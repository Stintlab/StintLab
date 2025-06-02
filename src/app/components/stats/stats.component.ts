import { Component, Input } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { MillisToDurationPipe } from "../../pipes/millisToDuration/millis-to-duration.pipe";
import { RacePlanModel } from '../../models/race-plan-model';
import { DriverModel } from '../../models/driver-model';

@Component({
  selector: 'app-stats',
  imports: [
    DecimalPipe,
    DatePipe,
    TableModule,
    PanelModule,
    MillisToDurationPipe
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  @Input() drivers: DriverModel[] | undefined;
  @Input() racePlan: RacePlanModel | undefined;

  getRaceStats() : Stat[] {
    if(this.drivers == undefined || this.racePlan == undefined){
      return [];
    }

    var lapDrivenMap: Map<string, number> = new Map();
    var timeDrivenMap: Map<string, number> = new Map();
    var timeInPitsMap: Map<string, number> = new Map();
    var lastStintMap: Map<string, Date> = new Map();
    var totalDriveTime: number = 0;
    var totalTimeInPitlane: number = 0;

    for (let i = 0; i < this.racePlan.stints.length; i++) {
      const stint = this.racePlan.stints[i];
      this.setOrUpdate(lapDrivenMap, stint.driver!.name, stint.laps!);
      this.setOrUpdate(timeDrivenMap, stint.driver!.name, stint.timeDriven!);
      this.setOrUpdate(timeInPitsMap, stint.driver!.name, stint.timeInPitlane!);
      //as stints need to be in order, we can always overwrite
      lastStintMap.set(stint.driver!.name, stint.stintEndTime!);
      totalDriveTime += stint.timeDriven!;
      totalTimeInPitlane += stint.timeInPitlane!;
    }

    var driverStats = this.drivers.map(d => {
      var lapsDriven = lapDrivenMap.get(d.name);
      if(!lapsDriven) lapsDriven = 0;
      var lapsShare = lapsDriven / this.racePlan!.totalLapCount!;
      var timeDriven = timeDrivenMap.get(d.name);
      if(!timeDriven) timeDriven = 0;
      var timeShare = timeDriven / totalDriveTime;
      var timeInPits = timeInPitsMap.get(d.name);
      if(!timeInPits) timeInPits = 0;
      var lastStintEnd: Date | null;
      var temp = lastStintMap.get(d.name);
      if(!temp) lastStintEnd = null;
      else lastStintEnd = temp!;

      return new Stat(d.name, lapsDriven, lapsShare, timeDriven, timeShare, timeInPits, lastStintEnd);
    });

    var total = new Stat("Total", this.racePlan.totalLapCount!, 1, totalDriveTime, 1, totalTimeInPitlane, this.racePlan.raceEnd);
    driverStats.push(total);
    return driverStats;
  }

   setOrUpdate(map: Map<string, number>, key: string, newValue: number) : void {
      var oldValue = map.get(key);
      if(oldValue){
        map.set(key, oldValue + newValue);
      }
      else{
        map.set(key, newValue);
      }
  }

}

class Stat {
  name: string;
  lapsDriven: number;
  lapsShare: number;
  timeDriven: number;
  timeShare: number;
  timeInPitlane: number;
  lastStintEnd: Date | null;

  constructor(name: string, lapsDriven: number, lapsShare: number, timeDriven: number, timeShare: number, timeInPitlane: number, lastStintEnd: Date | null){
    this.name = name;
    this.lapsDriven = lapsDriven;
    this.lapsShare = lapsShare;
    this.timeDriven = timeDriven;
    this.timeShare = timeShare;
    this.timeInPitlane = timeInPitlane;
    this.lastStintEnd = lastStintEnd;
  }
}
