import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICar } from '../../interfaces/i-car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
  brandName: string = '';
  brandCars: ICar[] = [];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.brandName = params.get('brand') || '';
      this.loadBrandCars();
    });
  }

  async loadBrandCars(): Promise<void> {
    const allCars = await this.carService.getCars();
    this.brandCars = allCars.filter(car => car.brand === this.brandName);
  }
}
