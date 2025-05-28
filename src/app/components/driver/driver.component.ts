import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { DriverModel } from '../../models/DriverModel';

@Component({
  selector: 'app-driver',
  imports: [
    FloatLabelModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    InputMaskModule,
    InputTextModule
  ],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss'
})
export class DriverComponent implements OnInit {
  @Input() driver! : DriverModel;
  @Output() driverChange : EventEmitter<DriverModel> = new EventEmitter();
  laptimeInput: string = "";

  ngOnInit(): void {
  }

  parseLapTime(){
    if(this.laptimeInput.includes('_')){
      this.driver.laptimeInMilliseconds = undefined;
      return;
    }
    var colonIndex = this.laptimeInput.indexOf(':');
    var dotIndex = this.laptimeInput.indexOf('.');
    var minutes = Number.parseInt(this.laptimeInput.substring(0, colonIndex));
    var seconds = Number.parseInt(this.laptimeInput.substring(colonIndex+1, dotIndex));
    var milliseconds = Number.parseInt(this.laptimeInput.substring(dotIndex+1));
    if(Number.isNaN(minutes) || Number.isNaN(seconds) || Number.isNaN(milliseconds)){
      return;
    }
    var totalMillis = (minutes * 60 + seconds) * 1000 + milliseconds;
    this.driver.laptimeInMilliseconds = totalMillis;
  }

  submitChange(){
    this.driverChange.next(this.driver);
  }
}


