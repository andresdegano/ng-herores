import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '@shared/models/hero.model';

@Pipe({ name: 'nameFilter' })
export class NameFilterPipe implements PipeTransform {

  transform(value: Hero[] | null, name = ''): Hero[] {
    if (name === '' || !value) {
      return value || [];
    }
    return value.filter((hero) => {
      return hero.name.includes(name);
    });
  }
}
