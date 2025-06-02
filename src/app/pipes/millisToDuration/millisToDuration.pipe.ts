import { Pipe, PipeTransform } from '@angular/core';
import { DurationUtil } from '../../util/DurationUtil';

@Pipe({
  name: 'millisToDuration'
})
export class MillisToDurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    var t = DurationUtil.fromMilliseconds(value);
    return t.toString('hours', 'miliseconds');
  }
}
