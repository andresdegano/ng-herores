import {Pipe, PipeTransform} from '@angular/core';
import { Hero } from '@shared/models/hero.model';

@Pipe({name: 'nameFilter'})
export class NameFilterPipeMock implements PipeTransform {
    transform(value: Hero[] | null, name = ''): Hero[]{
        return value || [];
    }
}