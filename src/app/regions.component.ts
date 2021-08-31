import {Component, Input, OnInit} from '@angular/core';
//import { Countries } from './countries';
import { CountriesService } from './countries.service';
import {Regions} from "./regions";

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
  @Input() selectedRegion: any
  @Input() iso_country: any
  @Input() regions : any
  appTitle = "LTpost app"
  //public countries: Countries[] = [];
  // public regions: Regions[] = [];
  public error_reg = '';
  public success_reg = '';

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
    this.getRegions();
  }


  protected getRegions() {
    this.countriesService.getCountryRegions(this.iso_country).subscribe(
      (data: Regions[]) => {
        this.regions = data;
        console.log(this.regions + ' regions list regions.component.ts');
        this.success_reg = 'successful retrieval of the list';
      },
      (err: string) => {
        console.log(err);
        this.error_reg = err;
      }
    );
  }

  selectRegionsHandler (event: any) {
    this.selectedRegion = event.target.value.substring(3).trim();
    console.log(  event.target.value );
  }
}

