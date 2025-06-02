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
    var stintModel = new StintModel(0);
    stintModel.stintEndTime = new Date();
    var driver = new DriverModel("test");
    stintModel.driver = driver;
    component.racePlan = new RacePlanModel(0, [stintModel]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
