import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { DriverModel } from '../../models/DriverModel';
import { DurationUtil } from '../../util/DurationUtil';

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

  ngOnInit(): void {
  }

  getLapTime(){
    if(this.driver.laptimeInMilliseconds == undefined){
      return null;
    }
    var d = DurationUtil.fromMilliseconds(this.driver.laptimeInMilliseconds);
    return d.toString('minutes', 'miliseconds');
  }

  setLapTime(input: string | null){
    if(input == null ||  input.includes('_')){
      this.driver.laptimeInMilliseconds = undefined;
      return;
    }
    var d = DurationUtil.fromDurationString(input);
    if(!d.isValid()){
      return;
    }
    this.driver.laptimeInMilliseconds = d.toTotalMillis();
    this.submitChange();
  }

  submitChange(){
    this.driverChange.next(this.driver);
  }
}


