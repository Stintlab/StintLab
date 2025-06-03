import { Pipe, PipeTransform } from '@angular/core';
import { DurationUtil } from '../../util/duration-util';

@Pipe({
  name: 'millisToDuration'
})
export class MillisToDurationPipe implements PipeTransform {

  transform(value: number | undefined, from: 'hours' | 'minutes' = 'hours', to: 'seconds' | 'milliseconds' = 'milliseconds'): string | null {
    if(value === undefined) {
      return null;
    }

    return DurationUtil.fromMilliseconds(value).toString(from, to);
  }
}
