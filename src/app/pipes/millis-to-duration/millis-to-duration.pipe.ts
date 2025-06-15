import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisToDuration'
})
export class MillisToDurationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
