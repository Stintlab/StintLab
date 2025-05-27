import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DriverModel } from '../../models/DriverModel';
import { DriverComponent } from '../driver/driver.component';

@Component({
  selector: 'app-drivermanager',
  imports: [TabsModule, DriverComponent],
  templateUrl: './drivermanager.component.html',
  styleUrl: './drivermanager.component.scss'
})
export class DrivermanagerComponent implements OnInit {

  drivers: DriverModel[] = [new DriverModel("Udo", 3.2, "", false), new DriverModel("Daniel", 2, "", true)];

    ngOnInit(): void {
  }

  active(driver: DriverModel){
    if(driver.isActive)
      return "p-tab-active";
    else
      return "";
  }
}
