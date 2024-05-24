import { Component, } from '@angular/core';
import { ICar } from '../../interfaces/i-car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  carsArr: ICar[] = [];
  brandLogos: string[] = [];
  randomCars: ICar[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadCars();
  }

  async loadCars(): Promise<void> {
    this.carsArr = await this.carService.getCars();
    this.extractBrandLogos();
    this.selectRandomCars();
  }

  extractBrandLogos(): void {
    const uniqueBrands = Array.from(new Set(this.carsArr.map(car => car.brandLogo)));
    this.brandLogos = uniqueBrands.slice(0, 3);
  }

  selectRandomCars(): void {
    const shuffledCars = [...this.carsArr].sort(() => 0.5 - Math.random());
    this.randomCars = shuffledCars.slice(0, 2);
  }

  getBrandNameByLogo(logoUrl: string): string {
    const car = this.carsArr.find(car => car.brandLogo === logoUrl);
    return car ? car.brand : '';
  }
}
