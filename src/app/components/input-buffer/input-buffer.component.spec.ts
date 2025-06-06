/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBufferComponent } from './input-buffer.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('InputBufferComponent', () => {
  let component: InputBufferComponent;
  let fixture: ComponentFixture<InputBufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBufferComponent],
      providers: [
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
