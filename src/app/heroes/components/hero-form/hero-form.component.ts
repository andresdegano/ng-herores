import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '@core/services/loading.service';
import { HeroModel } from '@shared/models/hero.model';
import { delay } from 'rxjs';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html'
})
export class HeroFormComponent implements OnInit, AfterContentInit {
  @Input() hero?: HeroModel;

  @Output() heroChange = new EventEmitter<HeroModel>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  isLoading = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    superPower: new FormControl('', [
      Validators.required,
      Validators.maxLength(150)
    ]),
    strength: new FormControl(1, [Validators.required, Validators.min(0)])
  });

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngAfterContentInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.heroChange.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'hero') {
          if (changes[propName].currentValue) {
            this.form.setValue(
              {
                name: changes[propName].currentValue.name,
                superPower: changes[propName].currentValue.superPower,
                strength: changes[propName].currentValue.strength
              },
              { onlySelf: false, emitEvent: false }
            );
          }
        }
      }
    }
  }
}
