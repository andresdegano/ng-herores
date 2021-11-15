import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesMainComponent } from './heroes-main.component';

import { Router } from '@angular/router';
import { HeroesService } from '@heroes/services/heroes.service';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NameFilterPipeMock } from '@shared/pipes/name-filter.pipe.mock';
import { Hero } from '@shared/models/hero.model';

describe('HeroesMainComponent', () => {
  let component: HeroesMainComponent;
  let fixture: ComponentFixture<HeroesMainComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let heroesServiceMock: jasmine.SpyObj<HeroesService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  let hero: Hero = {
    id: '2',
    name: 'TICTAC',
    superPower: 'go back in time',
    strength: 1
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    heroesServiceMock = jasmine.createSpyObj<HeroesService>('HeroesService', [
      'getAllHeroes',
      'deleteHero'
    ]);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [HeroesMainComponent, NameFilterPipeMock],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: HeroesService, useValue: heroesServiceMock }
      ]
    }).compileComponents();

    heroesServiceMock.getAllHeroes.and.returnValue(of());
    heroesServiceMock.deleteHero.and.returnValue(of());
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On Initialize', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should get all heroes', () => {
      expect(heroesServiceMock.getAllHeroes).toHaveBeenCalled();
    });
  });

  describe('On Edit', () => {
    it('should redirect to the hero edit page', () => {
      component.onEdit(hero);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
        `/hero/edit/${hero.id}`
      );
    });
  });

  describe('On Remove', () => {
    it('should open delete dialog', () => {
      component.onRemove(hero);
      expect(dialogSpy.open).toHaveBeenCalledWith(jasmine.any(Function), {
        width: '250px',
        data: {
          title: 'Delete Hero',
          subtitle: `Are you sure you want to delete ${hero.name}?`
        }
      });
    });
  });
});
