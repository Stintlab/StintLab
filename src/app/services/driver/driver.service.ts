import { AsyncSubject, BehaviorSubject, filter, firstValueFrom, map, Observable, ReplaySubject, Subject, switchMap, take } from 'rxjs';
import { DriverModel } from '../../models/driver-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private drivers: AsyncSubject<DriverModel[]> = new AsyncSubject<DriverModel[]>();
  drivers$: Observable<DriverModel[]> = this.drivers.asObservable();

  constructor() {
    this.drivers$.pipe(take(1))

  }

}
