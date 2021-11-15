import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, HeroModel } from '@shared/models/hero.model';
import { environment as env } from '@env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getAllHeroes(): Observable<Hero[]> {
    
    return this.http.get<Hero[]>(`${env.apiUrl}heroes`);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${env.apiUrl}heroes/${id}`);
  }

  getHeroesByName(name: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${env.apiUrl}?name_like=${name}`);
  }

  createHero(hero: HeroModel): Observable<Hero> {
    return this.http.post<Hero>(`${env.apiUrl}heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${env.apiUrl}heroes/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<any> {
    return this.http.delete<any>(`${env.apiUrl}heroes/${id}`);
  }
}
