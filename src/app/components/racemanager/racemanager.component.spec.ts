import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RacemanagerComponent } from './racemanager.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { importProvidersFrom } from '@angular/core';
import { createEmptyRaceModel, RaceModel } from '../../models/race-model';

describe('RacemanagerComponent', () => {
  let component: RacemanagerComponent;
  let fixture: ComponentFixture<RacemanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RacemanagerComponent],
      providers: [
        importProvidersFrom(LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR
        }))
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacemanagerComponent);
    component = fixture.componentInstance;
    component.race = createEmptyRaceModel();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
