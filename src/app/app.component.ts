import {Component, Input, OnInit} from '@angular/core';
import {Countries} from "./countries";
import {CountriesService} from "./countries.service";
import {Regions} from "./regions";
import {Airports} from "./airports";
import {Prices} from "./prices";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Input() selectedCountry: any
  @Input() selectedRegion: any
  @Input() selectedAirport: any
  @Input() iso_country: any
  @Input() iso_region: string | undefined
  //@Input() idAirport: any
  //@Input() provider: any
  @Input() code: any
  appTitle = "LTpost app"
  public countries: Countries[] = [];
  public regions: Regions[] = [];
  public airports: Airports[] = [];
  public prices: Prices[] =[];
  public error = '';
  public success = '';
  public error_r = '';
  public success_r = '';
  public error_a = '';
  public success_a = '';
  public error_p = '';
  public success_p = '';



  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
    this.getCountries();
  }

  private getCountries() {
    this.countriesService.getCountriesList().subscribe(
      (data: Countries[]) => {
        this.countries = data;
        this.success = 'successful retrieval of the list';
        //console.log(data);
      },
      (err: string) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  private getRegions(iso_country: string) {
    this.countriesService.getCountryRegions(this.iso_country).subscribe(
      (data: Regions[]) => {
        this.regions = data;
        this.success_r = 'successful retrieval of the list';
       // console.log(data);
      },
      (err: string) => {
        console.log(err);
        this.error_r = err;
      }
    );
  }

  private getAirports(){
    this.countriesService.getRegionAirports(this.iso_region).subscribe(
      (data: Airports[]) => {
        this.airports = data;
        this.success_a = 'successful retrieval of the list';
        console.log(this.regions + ' app.component.ts list');
        console.log("airports  ++++++++++++++++ " + this.airports);
      },
      (err: string) => {
        console.log(err);
        this.error_a = err;
      }
    );
  }
  getPrice(provider:any,idAirport:any ): any{
    this.countriesService.getFlightPrice(provider, idAirport).subscribe(
      (data: Prices[]) => {
        console.log(this.prices + ' app.component.ts prices');
        return this.prices = data;
      },
      (err: string) => {
        console.log(err);
        return this.error_p = err;
      }
    );
  }
  selectCountriesHandler (event: any) {
    let comma1 = event.target.value.indexOf(',');
    let comma2 = event.target.value.indexOf(',', comma1 + 1);
    this.iso_country = event.target.value.substring(comma1 + 1, comma2).trim();
    this.selectedCountry = event.target.value.substring(comma2+1).trim();
    console.log( '    '  + this.selectedCountry + '    ' + this.iso_country );
    this.getRegions(this.iso_country);

  }
  selectRegionsHandler (event: any) {
    console.log('works ');
    let comma1 = event.target.value.indexOf(',');
    let comma2 = event.target.value.indexOf(',', comma1 + 1);
    this.iso_region = event.target.value.substring(comma1 + 1, comma2);
    this.selectedRegion = event.target.value.substring(comma2+1);
    this.getAirports();
    console.log(this.selectedRegion + "  this.selectedRegion **************************  -" + this.airports);
  }
}
