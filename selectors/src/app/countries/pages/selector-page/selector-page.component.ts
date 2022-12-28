import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryServiceService } from '../../services/country-service.service';
import { CountrySmall } from '../../interfaces/countries.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required]
  })
  
  //Selectors
  regions: string[] = [];
  countries: CountrySmall[]=[];


  constructor(private fb: FormBuilder,
              private countryService: CountryServiceService) { }

  ngOnInit(): void {
    this.regions=this.countryService.regions;

    //Cuando cambie la region

    /*this.myForm.get('region')?.valueChanges
      .pipe(
        switchMap(region => this.countryService.getCountriesByRegion(region))
      )
      .subscribe(countries => {
       console.log(countries)
      })*/

    /*this.myForm.get('region')?.valueChanges
      .subscribe(region => {
       console.log(region)
       this.countryService.getCountriesByRegion(region)
      })*/

    this.myForm.get('region')?.valueChanges
    .subscribe(region =>{
      console.log(region)

      this.countryService.getCountriesByRegion(region)
      .subscribe(countries => {
        console.log(countries);
        this.countries=countries;

      })
    })
  }

  save(){
    console.log(this.myForm.value);
  }

}
