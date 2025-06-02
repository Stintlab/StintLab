import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DriverModel } from '../../models/driver-model';
import { DriverComponent } from '../driver/driver.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-drivermanager',
  imports: [TabsModule, DriverComponent, ButtonModule],
  templateUrl: './drivermanager.component.html',
  styleUrl: './drivermanager.component.scss'
})
export class DrivermanagerComponent implements OnInit {
  @Input() drivers!: DriverModel[];
  @Output() driversChange: EventEmitter<DriverModel[]> = new EventEmitter();
  driverTab: number = -1;

  ngOnInit(): void {
    if(this.drivers.length == 0){
      this.addDriver();
    }
    else{
      this.driverTab = 0;
    }
  }

  addDriver(){
    this.driverTab = this.drivers.length;
    this.drivers.push(new DriverModel("Driver " + (this.drivers.length + 1)));
    this.submitChange();
  }

  removeDriver(index: number){
    this.drivers.splice(index, 1);
    this.submitChange();
    if(this.driverTab == index){
      this.driverTab--;
    }
  }

  submitChange(){
    this.driversChange.next(this.drivers);
  }

}
