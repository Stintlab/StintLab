import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverManagerComponent } from './driver-manager.component';

describe('DriverManagerComponent', () => {
  let component: DriverManagerComponent;
  let fixture: ComponentFixture<DriverManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
