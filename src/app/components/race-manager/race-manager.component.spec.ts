import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceManagerComponent } from './race-manager.component';

describe('RaceManagerComponent', () => {
  let component: RaceManagerComponent;
  let fixture: ComponentFixture<RaceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
