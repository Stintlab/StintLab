import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrivermanagerComponent } from './drivermanager.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { importProvidersFrom } from '@angular/core';

describe('DrivermanagerComponent', () => {
  let component: DrivermanagerComponent;
  let fixture: ComponentFixture<DrivermanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivermanagerComponent],
      providers: [
        importProvidersFrom(LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR
        }))
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivermanagerComponent);
    component = fixture.componentInstance;
    component.drivers = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
