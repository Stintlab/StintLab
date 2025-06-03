import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { RaceModel } from '../../models/race-model';
import { DurationUtil } from '../../util/duration-util';
import { MillisToDurationPipe } from "../../pipes/millis-to-duration/millis-to-duration.pipe";

@Component({
  selector: 'app-racemanager',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    InputMaskModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    MillisToDurationPipe
],
  templateUrl: './racemanager.component.html',
  styleUrls: ['./racemanager.component.css']
})
export class RacemanagerComponent implements OnInit {
  @Input() race! : RaceModel;
  @Output() raceChange : EventEmitter<RaceModel> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  getRefuelRate(){
    var refuelRate = this.race.refuelRateInMillisecondsPerLiterRefueled;
    if(refuelRate == undefined) {
      return null;
    }
    else {
      return (1000 / refuelRate);
    }
  }

    getDrivethrough(){
    var drivethrough = this.race.driveThroughInMilliseconds;
    if(drivethrough == undefined) {
      return null;
    }
    else {
      return (drivethrough / 1000);
    }
  }

  setRaceDuration(raceDurationInput: string){
    if(raceDurationInput.includes('_')){
      this.race.raceDurationInMilliseconds = undefined;
      return;
    }
    var d = DurationUtil.fromDurationString(raceDurationInput);
    if(!d.isValid()){
      return;
    }
    this.race.raceDurationInMilliseconds = d.toTotalMillis();
    this.submitChange();
  }

  setRefuelRate(refuelRateInput: number | undefined){
    if(refuelRateInput != null){
      this.race.refuelRateInMillisecondsPerLiterRefueled = 1000.0 / refuelRateInput!;
    }
    else{
      this.race.refuelRateInMillisecondsPerLiterRefueled = undefined;
    }
    this.submitChange();
  }

  setDrivethrough(drivethroughDurationInput: number | undefined){
    if(drivethroughDurationInput != null){
      this.race.driveThroughInMilliseconds = 1000.0 * drivethroughDurationInput!;
    }
    else{
      this.race.driveThroughInMilliseconds = undefined;
    }
    this.submitChange();
  }

  submitChange(){
    this.raceChange.next(this.race);
  }

}
