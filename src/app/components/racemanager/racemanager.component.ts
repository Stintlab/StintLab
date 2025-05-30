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
import { RaceModel } from '../../models/RaceModel';
import { MillisToDurationPipe } from '../../pipes/millisToDuration/millisToDuration.pipe';0


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
    SelectModule
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

  getRaceDuration(){
    var raceDuration = this.race.raceDurationInMilliseconds;
    if(raceDuration == undefined) {
      return '';
    }
    else {
      var remainder = Math.floor(raceDuration / 1000);
      var seconds = remainder % 60;
      remainder = Math.floor(remainder / 60);
      var minutes = remainder % 60;
      remainder = Math.floor(remainder / 60);
      var hours = remainder % 24;
      remainder = Math.floor(remainder / 24);

      return MillisToDurationPipe.formatNumber(hours, 2)
      + ":" + MillisToDurationPipe.formatNumber(minutes, 2)
      + ":" + MillisToDurationPipe.formatNumber(seconds, 2);
    }
  }

  getRefuelRate(){
    var refuelRate = this.race.refuelRateInMillisecondsPerLiterRefueled;
    if(refuelRate == undefined) {
      return '';
    }
    else {
      return '' + (1000 / refuelRate);
    }
  }

    getDrivethrough(){
    var drivethrough = this.race.driveThroughInMilliseconds;
    if(drivethrough == undefined) {
      return '';
    }
    else {
      return '' + (drivethrough / 1000);
    }
  }

  setRaceDuration(raceDurationInput: string){
    if(raceDurationInput.includes('_')){
      this.race.raceDurationInMilliseconds = undefined;
      return;
    }
    var split = raceDurationInput.split(':');
    var hours = Number.parseInt(split[0]);
    var minutes = Number.parseInt(split[1]);
    var seconds = Number.parseInt(split[2]);
    if(Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)){
      return;
    }
    var totalMillis = (((hours * 60) + minutes) * 60 + seconds) * 1000;
    this.race.raceDurationInMilliseconds = totalMillis;
    this.submitChange();
  }

  setRefuelRate(refuelRateInput: number | undefined){
    if(refuelRateInput != undefined){
      this.race.refuelRateInMillisecondsPerLiterRefueled = 1000.0 / refuelRateInput!;
    }
    this.submitChange();
  }

  setDrivethrough(drivethroughDurationInput: number | undefined){
    if(drivethroughDurationInput != undefined){
      this.race.driveThroughInMilliseconds = 1000.0 * drivethroughDurationInput!;
    }
    this.submitChange();
  }

  submitChange(){
    this.raceChange.next(this.race);
  }

}
