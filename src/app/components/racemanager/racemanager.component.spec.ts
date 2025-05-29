import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RacemanagerComponent } from './racemanager.component';

describe('RacemanagerComponent', () => {
  let component: RacemanagerComponent;
  let fixture: ComponentFixture<RacemanagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RacemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
