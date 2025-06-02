import { formatDate, formatNumber } from "@angular/common";

export class DurationUtil {
  hours: number = NaN;
  minutes: number = NaN;
  seconds: number = NaN;
  milliseconds: number = NaN;

  constructor(){}

  isValid(){
    return Number.isFinite(this.hours)
    && Number.isFinite(this.minutes)
    && Number.isFinite(this.seconds)
    && Number.isFinite(this.milliseconds);
  }

  toTotalMillis() : number {
    return ((((this.hours * 60) + this.minutes) * 60 + this.seconds) * 1000) + this.milliseconds;
  }

  static fromMilliseconds(millis: number) : DurationUtil {
    var t = new DurationUtil();
    t.milliseconds = millis % 1000;
    var remainder = Math.floor(millis / 1000);
    t.seconds = remainder % 60;
    remainder = Math.floor(remainder / 60);
    t.minutes = remainder % 60;
    t.hours = Math.floor(remainder / 60);
    return t;
  }

  static fromDurationString(duration: string) : DurationUtil {
    var t = new DurationUtil();
    var millisplit = duration.split('.');
    var split = millisplit[0].split(':');
    //parse milliseconds if given
    if(millisplit.length > 1){
      t.milliseconds = Number.parseInt(millisplit[1]);
    }
    else{
      t.milliseconds = 0;
    }
    //parse h:m:s or m:s
    if(split.length > 2){
      t.hours = Number.parseInt(split[0]);
      t.minutes = Number.parseInt(split[1]);
      t.seconds = Number.parseInt(split[2]);
    }
    else{
      t.hours = 0;
      t.minutes = Number.parseInt(split[0]);
      t.seconds = Number.parseInt(split[1]);
    }
    return t;
  }

  toString(from: 'hours' | 'minutes', to: 'seconds' | 'milliseconds'): string {
    var result = '';
    if(from === 'hours') {
      result += formatNumber(this.hours, 'en-US', '2.0') + ':'
    }
    
    result += formatNumber(this.minutes, 'en-US', '2.0') + ':' + formatNumber(this.seconds, 'en-US', '2.0');

    if(to === 'milliseconds') {
      result += '.' + formatNumber(this.milliseconds, 'en-US', '3.0');
    }
    return result;
  }

  static formatNumber(value: number, leadingZeros: number) : string {
    return ('' + value).padStart(leadingZeros, '0');
  }
}
