import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countries } from './countries';
import { Airports } from './airports';
import { map } from 'rxjs/operators';
import {Regions} from "./regions";
import {Prices} from "./prices";

//import { Regions } from './regions';
@Injectable({
  providedIn: 'root'
})

export class CountriesService {
  @Input() iso_country: string | undefined;
  @Input() iso_region: string | undefined;
  //@Input() provider: string | undefined;
  @Input() id: undefined;
  //@Input() idAirport: string | undefined;
  @Input() code: undefined;
  public baseUrl = 'http://localhost/ltpost/php/';
  public provUrl = 'http://localhost:8085/item/price/';

  constructor(private httpClient:HttpClient, private httpClient1:HttpClient) { }

  getCountriesList(): Observable<any> {
    return this.httpClient.get<Countries[]>(`${this.baseUrl}` + 'countries.php').pipe(
      map((res: any) => {
        console.debug('countries : ' + res);
        return res;
      })
    );
    //return this.http.get(`${this.baseUrl}`);//+'countries-list'); // to app-routing.module.ts -  Routes[]
  }

  getCountryRegions(iso_country: undefined): Observable<any> {
    console.log('regions countries.service.ts' + iso_country);
    return this.httpClient.get<Regions[]>(`${this.baseUrl}` + 'regions.php?iso='+ iso_country ).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  getRegionAirports(iso_region: string | undefined):Observable<any> {
    console.log('region id from countries.service.ts - ' + iso_region);
    return this.httpClient.get<Airports[]>(`${this.baseUrl}` + 'airports.php?iso_region=' + iso_region).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  getFlightPrice(provider: any, idAirport: any): Observable<any>{
    console.log('providers countries.service.ts - ' + provider);
    return this.httpClient.get<Prices[]>(`${this.provUrl}` + provider + '/' + idAirport).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  /*addCountry(countries: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'save-countries', countries);
  }

  deleteCountry(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-countries/${id}`, { responseType: 'text' });
  }

  getCountries(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/countries/${id}`);
  }

  updateCountries(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-countries/${id}`, value);
  }*/

}
