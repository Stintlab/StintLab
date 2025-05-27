import { RacemanagerComponent } from '../../components/racemanager/racemanager.component';
import { Component, OnInit } from '@angular/core';
import { DrivermanagerComponent } from '../../components/drivermanager/drivermanager.component';
import { PanelModule } from 'primeng/panel';
import { DriverModel } from '../../models/DriverModel';
import { RaceModel } from '../../models/RaceModel';

@Component({
  selector: 'app-stintplanner',
  imports: [
    PanelModule,
    DrivermanagerComponent,
    RacemanagerComponent
  ],
  templateUrl: './stintplanner.component.html',
  styleUrl: './stintplanner.component.scss'
})
export class StintplannerComponent implements OnInit {
  drivers: DriverModel[] = [];
  race: RaceModel = new RaceModel(new Date(), 0, 0);
  ngOnInit(): void {
  }

}
