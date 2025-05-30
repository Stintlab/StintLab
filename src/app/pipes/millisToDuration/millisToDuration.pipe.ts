import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisToDuration'
})
export class MillisToDurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    var millis = value % 1000;
    var remainder = Math.floor(value / 1000);
    var seconds = remainder % 60;
    remainder = Math.floor(remainder / 60);
    var minutes = remainder % 60;
    remainder = Math.floor(remainder / 60);
    var hours = remainder % 24;
    remainder = Math.floor(remainder / 24);

    return MillisToDurationPipe.formatNumber(hours, 2)
    + ":" + MillisToDurationPipe.formatNumber(minutes, 2)
    + ":" + MillisToDurationPipe.formatNumber(seconds, 2)
    + "." + MillisToDurationPipe.formatNumber(millis, 3);
  }

  static formatNumber(value: number, leadingZeros: number) : string {
    return ('' + value).padStart(leadingZeros, '0');
  }
}
