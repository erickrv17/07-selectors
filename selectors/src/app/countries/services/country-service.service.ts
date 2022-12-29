import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountrySmall, Country } from '../interfaces/countries.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  private baseUrl: string ='https://restcountries.com/v2'

  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get regions(): string[] {
    return [ ...this._regions ];
  }

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region: string):Observable<CountrySmall[]>{
    const url: string = `${this.baseUrl}/region/${region}?fields=alpha3Code&fields=name`
    return this.http.get<CountrySmall[]>(url);
  }

  getCountryByCode(code: string): Observable<Country | null>{

    if(!code){
      return of(null);
    }
    const url= `${this.baseUrl}/alpha/${code}`
    return this.http.get<Country>(url);
  }


  getCountryByCodeSmall(code: string): Observable<CountrySmall>{
    const url= `${this.baseUrl}/alpha/${code}?fields=alpha3Code&fields=name`
    return this.http.get<CountrySmall>(url);
  }


  getCountryByBorders(borders: string[]): Observable<CountrySmall[]>{
    if(!borders){
      return of([]);
    }
    const requests: Observable<CountrySmall>[]=[];
    borders.forEach(code => {
      const request = this.getCountryByCodeSmall(code);
      requests.push(request);
    });
    
    //Combine regresa un Observable que contiene un arreglo con todas la información de las peticiones internas que se realizaron
    return combineLatest( requests );
  }
}
