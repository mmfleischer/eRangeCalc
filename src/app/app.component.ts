import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorComponent } from './main/calculator/calculator.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalculatorComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eRangeCalc';
}
