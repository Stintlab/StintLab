import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverComponent } from './driver.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { importProvidersFrom } from '@angular/core';
import { DriverModel } from '../../models/driver-model';

describe('DriverComponent', () => {
  let component: DriverComponent;
  let fixture: ComponentFixture<DriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverComponent],
      providers: [
        importProvidersFrom(LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR
        }))
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverComponent);
    component = fixture.componentInstance;
    component.driver = {
      name: 'test-driver',
      fuelConsumption: undefined,
      laptimeInMilliseconds: undefined
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
