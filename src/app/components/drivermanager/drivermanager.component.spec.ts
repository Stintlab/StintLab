import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivermanagerComponent } from './drivermanager.component';

describe('DrivermanagerComponent', () => {
  let component: DrivermanagerComponent;
  let fixture: ComponentFixture<DrivermanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivermanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivermanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
