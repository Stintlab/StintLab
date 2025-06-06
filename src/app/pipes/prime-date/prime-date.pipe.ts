import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeDate'
})
export class PrimeDatePipe implements PipeTransform {

  transform(date: any): Date | undefined {
    return date ? new Date(date) : undefined;
  }

}
