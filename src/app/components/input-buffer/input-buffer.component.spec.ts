/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputBufferComponent } from './input-buffer.component';

describe('InputBufferComponent', () => {
  let component: InputBufferComponent;
  let fixture: ComponentFixture<InputBufferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBufferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
