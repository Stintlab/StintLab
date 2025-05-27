import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { DrivermanagerComponent } from '../drivermanager/drivermanager.component';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-stintplanner',
  imports: [NavComponent, DrivermanagerComponent, PanelModule],
  templateUrl: './stintplanner.component.html',
  styleUrl: './stintplanner.component.scss'
})
export class StintplannerComponent implements OnInit {



  ngOnInit(): void {
  }

}
