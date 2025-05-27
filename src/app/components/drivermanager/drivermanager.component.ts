import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() drivers!: DriverModel[];
  @Output() driversEvent: EventEmitter<DriverModel[]> = new EventEmitter();

  ngOnInit(): void {
  }

  addDriver(){
    console.log("driver added");
    this.drivers.push(new DriverModel("Driver " + (this.drivers.length + 1)));
  }
}
