import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputBufferOptions } from '../../models/utils/input-buffer-options';
import { PrimeDatePipe } from '../../pipes/prime-date/prime-date.pipe';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-input-buffer',
  templateUrl: './input-buffer.component.html',
  styleUrls: ['./input-buffer.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    PrimeDatePipe,
    DatePickerModule
  ]
})
export class InputBufferComponent implements OnInit, OnChanges {
  @Input() type: 'number' | 'text' | 'date' = 'text'
  @Input() validationCheck: (value: any) => boolean = () => true;
  @Input() inputOptions: InputBufferOptions = {};

  @Input() value!: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter()
  
  @Input() validInput: boolean = false;
  @Output() validInputChange: EventEmitter<boolean> = new EventEmitter();

  buffer!: any

  constructor() { }

  ngOnInit() {
    this.buffer = this.value;
    this.validInput = this.validationCheck(this.buffer)
    this.validInputChange.next(this.validInput)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['ngModel']) {
      this.buffer = this.value;
      this.validInput = this.validationCheck(this.buffer)
    }
  }

  submitValueChange() {
    if(this.validInput) {
      this.valueChange.next(this.buffer);
    }
  }

  validateInput() {
    this.validInput = this.validationCheck(this.buffer)
    this.validInputChange.next(this.validInput)
  }
}
