/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { StintcalculatorService } from './stintcalculator.service';
import { DriverModel } from '../../models/DriverModel';
import { RaceModel } from '../../models/RaceModel';
import { StintModel } from '../../models/StintModel';

describe('Service: Stintcalculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StintcalculatorService]
    });
  });

  it('should ...', inject([StintcalculatorService], (service: StintcalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
