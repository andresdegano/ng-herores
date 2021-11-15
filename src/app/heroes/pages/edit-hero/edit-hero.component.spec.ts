import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroComponent } from './edit-hero.component';

import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '@heroes/services/heroes.service';
import { of } from 'rxjs';
import { Hero } from '@shared/models/hero.model';

describe('EditHeroComponent', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;

  let routerSpy;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let heroesServiceMock: jasmine.SpyObj<HeroesService>;

  let hero: Hero = {
    id: '2',
    name: 'TICTAC',
    superPower: 'go back in time',
    strength: 1
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', [
      'snapshot'
    ]);
    heroesServiceMock = jasmine.createSpyObj<HeroesService>('HeroesService', [
      'getHeroById',
      'updateHero',
      'createHero'
    ]);

    await TestBed.configureTestingModule({
      declarations: [EditHeroComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        },
        { provide: HeroesService, useValue: heroesServiceMock }
      ]
    }).compileComponents();

    heroesServiceMock.getHeroById.and.returnValue(of(hero));
    heroesServiceMock.updateHero.and.returnValue(of(hero));
    heroesServiceMock.createHero.and.returnValue(of(hero));
  });

  const createComponent = () => {
    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  describe('New Hero', () => {
    beforeEach(() => {
      activatedRouteSpy.snapshot = {
        paramMap: {
          get: (_key: string) => undefined
        }
      } as any;
      createComponent();
    });

    describe('On initialize New Hero', () => {
      it('should not have id defined', () => {
        expect(component.id).toBeUndefined();
      });

      it('should have title New hero', () => {
        expect(component.title).toEqual('Add your Hero!');
      });

      it('should not call getHero', () => {
        expect(heroesServiceMock.getHeroById).not.toHaveBeenCalled();
      });

      it('should not define newHero var', () => {
        expect(component.newHero).toBeUndefined();
      });
    });

    describe('On Save', () => {
      it('should call create method', () => {
        component.newHero = {
          name: 'myhero',
          superPower: 'power',
          strength: 3
        };
        component.save();
        expect(heroesServiceMock.createHero).toHaveBeenCalledWith({
          name: 'myhero',
          superPower: 'power',
          strength: 3
        });
      });
    });
  });

  describe('Edit Hero', () => {
    beforeEach(() => {
      activatedRouteSpy.snapshot = {
        paramMap: {
          get: (_key: string) => '2'
        }
      } as any;
      createComponent();
    });

    describe('On initiali¡ze Edit Hero', () => {
      it('should have title Edit hero', () => {
        expect(component.title).toEqual('Edit your Hero!');
      });

      it('should have id defined', () => {
        expect(component.id).toEqual('2');
      });

      it('should call getHero', () => {
        expect(heroesServiceMock.getHeroById).toHaveBeenCalledWith('2');
      });

      it('should define newHero var', () => {
        expect(component.newHero).toEqual(hero);
      });
    });

    describe('On Save', () => {
      it('should call update method', () => {
        component.newHero!.name = 'myhero';
        component.save();
        expect(heroesServiceMock.updateHero).toHaveBeenCalledWith({
          ...hero,
          name: 'myhero'
        });
      });
    });
  });
});
