import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RacePlanModel } from '../../models/race-plan-model';
import { StintModel } from '../../models/stint-model';
import { DriverModel } from '../../models/driver-model';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsComponent],
      providers: [
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    component.drivers = [];
    var driver: DriverModel = {
      name: 'test',
      fuelConsumption: undefined,
      laptimeInMilliseconds: undefined
    };
    var stintModel: StintModel = {
      counter: 0,
      driver: driver,
      stintEndTime: new Date(),
      fuelUsed: undefined,
      laps: undefined,
      refuelTime: undefined,
      stintStartTime: undefined,
      timeDriven: undefined,
      timeInPitlane: undefined,
      totalStintLength: undefined,
      actualFuelUsed: undefined,
      actualLaps: undefined,
      actualStintEndTime: undefined
    };

    component.racePlan = new RacePlanModel(0, [stintModel]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
