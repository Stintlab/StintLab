/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RacemanagerComponent } from './racemanager.component';

describe('RacemanagerComponent', () => {
  let component: RacemanagerComponent;
  let fixture: ComponentFixture<RacemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
