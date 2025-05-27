import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
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
    InputTextModule,
    DatePickerModule,
    SelectModule
  ],
  templateUrl: './racemanager.component.html',
  styleUrls: ['./racemanager.component.css']
})
export class RacemanagerComponent implements OnInit {
  @Input() race! : RaceModel;
  @Output() raceChanged : EventEmitter<RaceModel> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
