import { Component, OnInit } from '@angular/core';
import { HeroesService } from '@heroes/services/heroes.service';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, delay, Observable, of } from 'rxjs';
import { Hero } from '@shared/models/hero.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-heroes-main',
  templateUrl: './heroes-main.component.html'
})
export class HeroesMainComponent implements OnInit {
  heroes$?: Observable<Hero[]>;
  name = new FormControl('');
  form = new FormGroup({
    name: new FormControl('')
  });
  error = false;
  isLoading = true;

  constructor(
    private router: Router,
    private heroesService: HeroesService,
    public dialog: MatDialog,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  onEdit(hero: Hero) {
    this.router.navigateByUrl(`/hero/edit/${hero.id}`);
  }

  loadData() {
    this.error = false;
    this.heroes$ = this.heroesService.getAllHeroes().pipe(
      catchError(() => {
        this.error = true;
        return of([]);
      })
  );
  }

  onRemove(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete Hero',
        subtitle: `Are you sure you want to delete ${hero.name}?`
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHero(hero.id).subscribe(() => {
          this.loadData();
        });
      }
    });
  }
}
