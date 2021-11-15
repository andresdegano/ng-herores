import { HttpClient } from '@angular/common/http';

import { HeroesService } from './heroes.service';

import { environment as env } from '@env';
import { HeroModel } from '@shared/models/hero.model';

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    delete: jasmine.Spy;
  };

  let hero: HeroModel = {
    name: 'TICTAC',
    superPower: 'go back in time',
    strength: 1
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', [
      'get',
      'put',
      'post',
      'delete'
    ]);
    heroesService = new HeroesService(httpClientSpy as any);
  });

  describe('Requests', () => {
    describe('Get All Heroes', () => {
      it('should call get method', () => {
        heroesService.getAllHeroes();
        expect(httpClientSpy.get).toHaveBeenCalledOnceWith(
          `${env.apiUrl}heroes`
        );
      });
    });

    describe('Get Hero by Id', () => {
      it('should call get method', () => {
        heroesService.getHeroById('1');
        expect(httpClientSpy.get).toHaveBeenCalledOnceWith(
          `${env.apiUrl}heroes/1`
        );
      });
    });

    describe('Get Heroes by name', () => {
      it('should call get method', () => {
        heroesService.getHeroesByName('TICTAC');
        expect(httpClientSpy.get).toHaveBeenCalledOnceWith(
          `${env.apiUrl}?name_like=TICTAC`
        );
      });
    });

    describe('Create Hero', () => {
      it('should call post method', () => {
        heroesService.createHero(hero);
        expect(httpClientSpy.post).toHaveBeenCalledOnceWith(
          `${env.apiUrl}heroes`,
          hero
        );
      });
    });

    describe('Update Hero', () => {
      it('should call put method', () => {
        heroesService.updateHero({ ...hero, id: '2' });
        expect(httpClientSpy.put).toHaveBeenCalledOnceWith(
          `${env.apiUrl}heroes/2`,
          { ...hero, id: '2' }
        );
      });
    });

    describe('Delete Hero', () => {
      it('should call delete method', () => {
        heroesService.deleteHero('2');
        expect(httpClientSpy.delete).toHaveBeenCalledOnceWith(
          `${env.apiUrl}heroes/2`
        );
      });
    });
  });
});
