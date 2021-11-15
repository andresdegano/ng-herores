import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeroesMainComponent } from './pages/heroes-main/heroes-main.component';
import { SingleHeroComponent } from './pages/single-hero/single-hero.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { EditHeroComponent } from './pages/edit-hero/edit-hero.component';

@NgModule({
  declarations: [
    HeroesListComponent,
    HeroComponent,
    HeroesMainComponent,
    SingleHeroComponent,
    HeroFormComponent,
    EditHeroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
