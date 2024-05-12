import {Component} from '@angular/core';
import {ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatCardModule, 
    MatRadioModule, 
    MatDividerModule,
    MatSliderModule
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {  

  /*
    Any Logic & Data in this class should usually be done serverside. This is just for demonstration purposes.
  */

  result = '--- km'; 
  /*
    List of efficiency coefficients for electric vehicles at different Temperatures [Temperature, Coefficient]
  */
  public static readonly temperatureData = new Map<number, number> ([
    [-20, 0.5],
    [-15, 0.53],
    [-10, 0.6],
    [-5, 0.69],
    [0, 0.8],
    [5, 0.89],
    [10, 1],
    [15, 1.074],
    [20, 1.15],
    [25, 1.074],
    [30, 1],
    [35, 0.89],
    [40, 0.8]
  ])

  /*
    Input Formbuilder populated with defaultvalues 
  */
  calculatorForm = this.formBuilder.group({
    capacity: [80, [Validators.required, Validators.min(1)]],
    consumption: [15, [Validators.required, Validators.min(1)]],
    drivingStyle: ['normal', [Validators.required]],
    weatherCondition: ['sun', [Validators.required]],
    temperature: [10, [Validators.required]]
  })
  
  constructor(private formBuilder: FormBuilder){ 
  }

  /*
    any change in any of the inputs will call onChange(),
    will chnage the result-variable to the calculated Range number or --- if invdalid data was present
  */
  onChange() {
    this.result = this.calculateRange()+" km";
  }

  /*
    basic data validation &
    range Calculation for the given data 
  */
  calculateRange(){
    if(
      (this.calculatorForm.value.capacity != null && this.calculatorForm.value.capacity > 0) &&
      (this.calculatorForm.value.consumption != null && this.calculatorForm.value.consumption > 0)
    ){
      return Math.round((this.calculatorForm.value.capacity/this.calculatorForm.value.consumption)*100*this.getDrivingStyleFactor()*this.getWeatherCconditionFactor()*this.getTemperatureFactor());
    }
    else return "---";
  }

  /*
    return efficiency coefficient based on temperature given
    if no data given for the temperature return 1 to circumvent distortion
  */
  getTemperatureFactor(){
    if(this.calculatorForm.value.temperature != null && CalculatorComponent.temperatureData.get(this.calculatorForm.value.temperature) !=  null){
      return CalculatorComponent.temperatureData.get(this.calculatorForm.value.temperature) ?? 1;
    }
    else return 1;
  }

  /*
    return preset coefficientsfor driving style
  */
  getDrivingStyleFactor(){
    switch(this.calculatorForm.value.drivingStyle){
      case "sport":{
        return 0.9;
      }
      case "eco":{
        return 1.05;
      }
      default:{
        return 1;
      }
    }
  }

  /*
    return preset coefficient for weather condition
  */
  getWeatherCconditionFactor(){
    switch(this.calculatorForm.value.weatherCondition){
      case "rain":{
        return 0.9;
      }
      case "snow":{
        return 0.75;
      }
      default:{
        return 1;
      }
    }
  }
}
