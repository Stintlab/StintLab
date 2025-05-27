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
  @Output() driverEvent : EventEmitter<DriverModel> = new EventEmitter();


  ngOnInit(): void {
  }

  submit(){
    this.driverEvent.next(this.driver);
  }
}


