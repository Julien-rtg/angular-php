import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Car } from './car';
import { CarService } from './car.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    cars: Car[] = []; // GET
    car: Car = {model: '', price: 0}; // POST
    error = '';
    success = '';
    
    
    constructor(private carService: CarService) {}
          
    ngOnInit() {
      this.getCars();
    }
          
    getCars(): void {
        this.carService.getAll().subscribe(
            (data: Car[]) => {
                this.cars = data;
                this.success = 'successful retrieval of the list';
                // setTimeout(() => {
                //     this.resetAlerts();
                // }, 4000);
            },
            (err) => {
                console.log(err);
                this.error = err;
            }
        );
    }

    addCar(f: NgForm){
        this.resetAlerts();

        this.carService.store(this.car).subscribe(
            (res:Car) => {
                // UPDATE CAR
                this.cars.push(res)

                this.success = 'Created successfully';

                f.reset();
            },
            (err) => (this.error = err.message)
        )
    }

    resetAlerts(){
        this.error = '';
        this.success = '';
    }
}