import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountrySmall } from '../interfaces/countries.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  private baseUrl: string ='https://restcountries.com/v2'

  private _regions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

  get regions(): string[] {
    return [ ...this._regions ];
  }

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region: string):Observable<CountrySmall[]>{
    const url: string = `${this.baseUrl}/region/${region}?fields=alpha3Code&fields=name`
    return this.http.get<CountrySmall[]>(url);
  }
}
