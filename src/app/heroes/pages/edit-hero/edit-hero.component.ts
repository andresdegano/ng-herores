import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '@heroes/services/heroes.service';
import { HeroModel } from '@shared/models/hero.model';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html'
})
export class EditHeroComponent implements OnInit {
  id: string | null = null;
  newHero?: HeroModel;
  title = 'Add your Hero!';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = 'Edit your Hero!';
      this.heroesService.getHeroById(this.id).subscribe((hero) => {
        this.newHero = hero;
      });
    }
  }

  save() {
    const saveHero$ = this.id
      ? this.heroesService.updateHero({ ...this.newHero!, id: this.id })
      : this.heroesService.createHero(this.newHero!);
    saveHero$.subscribe(() => {
      this.goHome();
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
