import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StintplannerComponent } from './stintplanner.component';

describe('StintplannerComponent', () => {
  let component: StintplannerComponent;
  let fixture: ComponentFixture<StintplannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StintplannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StintplannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
