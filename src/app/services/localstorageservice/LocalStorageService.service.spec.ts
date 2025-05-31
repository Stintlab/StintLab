import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageServiceService } from './LocalStorageService.service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { importProvidersFrom } from '@angular/core';

describe('Service: LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageServiceService,
        importProvidersFrom(LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR
        }))
       ]
    });
  });

  it('should init', inject([LocalStorageServiceService], (service: LocalStorageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
