import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase',
})
export class KebabCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value.toLowerCase().replace(/\s+/g, '-');
  }
}
