/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StintplannerComponent } from './Stintplanner.component';

describe('StintplannerComponent', () => {
  let component: StintplannerComponent;
  let fixture: ComponentFixture<StintplannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StintplannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StintplannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
