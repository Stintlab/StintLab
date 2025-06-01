import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StintLabComponent } from './stintlab.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('StintLabComponent', () => {
  let component: StintLabComponent;
  let fixture: ComponentFixture<StintLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StintLabComponent],
      providers: [
        provideAnimations(),
        importProvidersFrom(LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR
        }))
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StintLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
