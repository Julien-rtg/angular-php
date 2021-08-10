import { Component, OnInit } from '@angular/core';

import { Car } from './car';
import { CarService } from './car.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    cars: Car[] = [];
    error = '';
    success = '';
    title = 'cars';
    
    constructor(private carService: CarService) {
    }
          
    ngOnInit() {
      this.getCars();
    }
          
    getCars(): void {
        this.carService.getAll().subscribe(
          (data: Car[]) => {
            this.cars = data;
            this.success = 'successful retrieval of the list';
          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );
      }
  }