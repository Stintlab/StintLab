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
  raceDurationInput: string = "";

  constructor() { }

  ngOnInit() {
  }

  parseRaceDuration(){
    if(this.raceDurationInput.includes('_')){
      this.race.raceDurationInMilliseconds = undefined;
      return;
    }
    var split = this.raceDurationInput.split(':');
    var hours = Number.parseInt(split[0]);
    var minutes = Number.parseInt(split[1]);
    var seconds = Number.parseInt(split[2]);
    if(Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)){
      return;
    }
    var totalMillis = (((hours * 60) + minutes) * 60 + seconds) * 1000;
    this.race.raceDurationInMilliseconds = totalMillis;
  }

  submitChange(){
    this.raceChange.next(this.race);
  }

}
