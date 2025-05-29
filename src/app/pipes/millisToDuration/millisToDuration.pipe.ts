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

    return this.formatNumber(hours, 2) + ":" + this.formatNumber(minutes, 2) + ":" + this.formatNumber(seconds, 2) + "." + this.formatNumber(millis, 3);
  }

  formatNumber(value: number, leadingZeros: number) : string {
    return ('' + value).padStart(leadingZeros, '0');
  }
}
