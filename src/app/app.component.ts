import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fromEvent, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
    error?: string;
    success?: string;
    color = '';

    constructor(private carService: CarService) {}
          
    ngOnInit() {
        this.getCars();
        //this.testObservable();
        this.operatorObservable();
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

    updateCar(name: any, price: any, id: any){
        this.resetAlerts();

        this.carService.update({model: name.value, price: price.value, id: +id}).subscribe(
            (res) => {
                this.success = 'Update successfully';
            },
            (err) => (this.error = err)
        )
    }

    deleteCar(id: any){
        this.resetAlerts();
        this.carService.delete(id).subscribe(

            (res) => {
                this.cars = this.cars.filter(function(item) {
                    return item['id'] && +item['id'] !== +id;
                });

                this.success = 'Deleted succesfully'
            },
            (err) => (this.error = err)
        )
    }

    resetAlerts(){
        this.error = '';
        this.success = '';
    }

    testObservable() { // Async method using observable, will return the subscriber.next(4) after the console.log('just after subscribe')
        const observable = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
            setTimeout(() => {
                subscriber.next(4);
            }, 1000);
        
        });

        console.log('just before subscribe');
        const subs = observable.subscribe({
            next(x) {
                console.log('got value : ' + x)
            },
            error(err) {
                console.log(err);
            },
            complete() {
                console.log('done')
            },
        });
        console.log('just after subscribe');
    }



    operatorObservable(){
        const operatorObs = 
        of(1,2,3)
        .pipe(map((x) => x * x))
        .subscribe((v) => console.log(`value : ${v}`));

        const clicks = fromEvent<MouseEvent>(document, 'click');
        const positions = clicks.pipe(map(ev => ev.clientX));
        const subscribe = positions.subscribe({ // MUST USE THREE OBVSERVER FUNCTION WHEN SUBSCRIBING
            next(x) {
                console.log(x)
            },
            error(err){ console.log(err) },
            complete(){ 'done' },
        });
       
    }


    
}