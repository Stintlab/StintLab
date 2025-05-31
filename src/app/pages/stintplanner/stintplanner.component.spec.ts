import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StintplannerComponent } from './stintplanner.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('StintplannerComponent', () => {
  let component: StintplannerComponent;
  let fixture: ComponentFixture<StintplannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StintplannerComponent],
      providers: [
        provideAnimations(),
        importProvidersFrom(LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR
        }))
      ]
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
