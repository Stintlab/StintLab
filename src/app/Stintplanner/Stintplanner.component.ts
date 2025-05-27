import { RacemanagerComponent } from './../racemanager/racemanager.component';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { DrivermanagerComponent } from '../drivermanager/drivermanager.component';
import { PanelModule } from 'primeng/panel';
import { DriverModel } from '../../models/DriverModel';
import { RaceModel } from '../../models/RaceModel';

@Component({
  selector: 'app-stintplanner',
  imports: [
    NavComponent,
    PanelModule,
    DrivermanagerComponent,
    RacemanagerComponent
  ],
  templateUrl: './stintplanner.component.html',
  styleUrl: './stintplanner.component.scss'
})
export class StintplannerComponent implements OnInit {
  drivers: DriverModel[] = [];
  race: RaceModel = new RaceModel("", 0, 0);
  ngOnInit(): void {
  }

}
