import { TestBed, inject } from '@angular/core/testing';
import { StintcalculatorService } from './stintcalculator.service';
import { importProvidersFrom } from '@angular/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

describe('Service: Stintcalculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StintcalculatorService,
        importProvidersFrom(LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR
        }))
      ]
    });
  });

  it('should init', inject([StintcalculatorService], (service: StintcalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
