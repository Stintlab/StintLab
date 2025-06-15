import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StintsTableComponent } from './stints-table.component';

describe('StintsTableComponent', () => {
  let component: StintsTableComponent;
  let fixture: ComponentFixture<StintsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StintsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StintsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
