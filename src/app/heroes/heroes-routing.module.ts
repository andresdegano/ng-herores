import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditHeroComponent } from './pages/edit-hero/edit-hero.component';
import { HeroesMainComponent } from './pages/heroes-main/heroes-main.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesMainComponent
  },
  {
    path: 'hero/edit/:id',
    component: EditHeroComponent
  },
  {
    path: 'hero/new',
    component: EditHeroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule {}
