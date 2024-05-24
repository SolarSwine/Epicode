import { Injectable } from '@angular/core';
import { ICar } from '../interfaces/i-car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string = 'assets/db.json';

  constructor() {}

  async getCars(): Promise<ICar[]> {
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    return data; 
  }
}
