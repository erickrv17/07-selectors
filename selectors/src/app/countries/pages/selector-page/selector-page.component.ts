import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryServiceService } from '../../services/country-service.service';
import { CountrySmall } from '../../interfaces/countries.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })
  
  //Selectors
  regions: string[] = [];
  countries: CountrySmall[]=[];
  //borders: string[]=[];
  borders: CountrySmall[]=[];

  //UI
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private countryService: CountryServiceService) { }

  ngOnInit(): void {
    this.regions=this.countryService.regions;

    //Cuando cambie la region
    this.myForm.get('region')?.valueChanges
      .pipe(
        //Disparar un efecto secundario
        tap((_) => {
          console.log(_);
          this.myForm.get('country')?.reset('');
          //this.myForm.get('border')?.disable();
          this.loading=true;
        }),
        switchMap(region => this.countryService.getCountriesByRegion(region))
      )
      .subscribe(countries => {
       console.log(countries);
       this.countries=countries;
       this.loading=false;
      })
    //MANERA DE HACERLO PERO MAS COMPLICADO  
    /*this.myForm.get('region')?.valueChanges
    .subscribe(region =>{
      console.log(region)

      this.countryService.getCountriesByRegion(region)
      .subscribe(countries => {
        console.log(countries);
        this.countries=countries;

      })
    })*/

    //Cuando cambie de Pais
    /*this.myForm.get('country')?.valueChanges
    .subscribe(code =>{
      console.log(code)
    })*/
    this.myForm.get('country')?.valueChanges
      .pipe(
        //Disparar un efecto secundario
        tap((_) => {
          console.log(_);
          this.borders=[];
          this.myForm.get('border')?.reset('');
          this.loading=true;
          //this.myForm.get('border')?.enable();
        }),
        switchMap(countryCode => this.countryService.getCountryByCode(countryCode)),
        switchMap( country => this.countryService.getCountryByBorders(country?.borders!))
      )
      .subscribe(countries => {
       console.log(countries);
       this.borders=countries || [];
       this.loading=false;
      })
  }

  save(){
    console.log(this.myForm.value);
  }

}
