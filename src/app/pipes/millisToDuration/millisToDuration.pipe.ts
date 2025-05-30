import { Pipe, PipeTransform } from '@angular/core';
import { DurationUtil } from '../../util/DurationUtil';

@Pipe({
  name: 'millisToDuration'
})
export class MillisToDurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    var t = DurationUtil.fromMilliseconds(value);
    return DurationUtil.formatNumber(t.hours, 2)
    + ":" + DurationUtil.formatNumber(t.minutes, 2)
    + ":" + DurationUtil.formatNumber(t.seconds, 2)
    + "." + DurationUtil.formatNumber(t.milliseconds, 3);
  }
}
