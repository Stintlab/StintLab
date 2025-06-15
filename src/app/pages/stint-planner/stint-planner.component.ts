import { Component } from '@angular/core';
import { RaceManagerComponent } from "../../components/race-manager/race-manager.component";
import { DriverManagerComponent } from "../../components/driver-manager/driver-manager.component";
import { StatisticsComponent } from "../../components/statistics/statistics.component";
import { StintsTableComponent } from "../../components/stints-table/stints-table.component";

@Component({
  selector: 'sl-stint-planner',
  imports: [
    RaceManagerComponent,
    DriverManagerComponent,
    StatisticsComponent,
    StintsTableComponent
],
  templateUrl: './stint-planner.component.html',
  styleUrl: './stint-planner.component.css'
})
export class StintPlannerComponent {

}
