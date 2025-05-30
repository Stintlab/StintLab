/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageServiceService } from './LocalStorageService.service';

describe('Service: LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageServiceService]
    });
  });

  it('should ...', inject([LocalStorageServiceService], (service: LocalStorageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
