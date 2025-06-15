import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StintPlannerComponent } from './stint-planner.component';

describe('StintPlannerComponent', () => {
  let component: StintPlannerComponent;
  let fixture: ComponentFixture<StintPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StintPlannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StintPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
