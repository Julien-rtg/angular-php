import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AsyncSubject, BehaviorSubject, from, fromEvent, interval, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, multicast, refCount } from 'rxjs/operators';

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
        // this.testObservable();
        // this.operatorObservable();
        this.subjectObservable();
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
       
        
        setTimeout(() => { // CANCEL THE SUBSCRIBE AFTER 2000MS
            subscribe.unsubscribe();
        }, 2000);
    }

    subjectObservable() {

        // const subject = new Subject<number>();

        // subject.subscribe({
        //     next(x) { console.log(`Observer A : ${x} `) }
        // });
        // subject.subscribe({
        //     next(x) { console.log(`Observer B : ${x} `) }
        // });

        // subject.next(1); WILL RETURN A:1 B:1 A:2 B:2
        // subject.next(2);

        // const observable = from([1, 2, 3]); // WILL RETURN A:1 B:1 A:2 B:2 A:3 B:3
        // observable.subscribe(subject);


        /////// MULTICAST //////////

        // const source = interval(500);
        // const subject = new Subject();
        // const refCounted = source.pipe(multicast(subject), refCount());
        // let subscription1:any, subscription2:any;


        // console.log('ObserverA subscribed');
        // subscription1 = refCounted.subscribe({
        //     next: (v) => console.log(`Observer A : ${v}`)
        // });

        // setTimeout(() => {
        //     console.log('ObserverB subscribed');
        //     subscription2 = refCounted.subscribe({
        //         next: (v) => console.log(`Observer B : ${v}`)
        //     });
        // }, 600)

        // setTimeout(() => {
        //     console.log('ObserverA unsubscribed');
        //     subscription1.unsubscribe();
        // }, 1200)

        // setTimeout(() => {
        //     console.log('ObserverB unsubscribed');
        //     subscription2.unsubscribe();
        // }, 2000)

        ////// BEHAVIOR SUBJECT /////
        // It stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the "current value" from the BehaviorSubject.

        // const subject = new BehaviorSubject(0);

        // subject.subscribe({
        //     next: (v) => console.log(`ObserverA : ${v}`)
        // });

        // subject.next(1);
        // subject.next(2);

        // subject.subscribe({
        //     next: (v) => console.log(`ObserverB : ${v}`)
        // });

        // subject.next(3);


        //////// REPLAY SUBJECT ///////
        //  ReplaySubject records multiple values from the Observable execution and replays them to new subscribers.

        // const subject = new ReplaySubject(3);

        // subject.subscribe({
        //     next: (v) => console.log(`ObserverA ${v}`)
        // });

        // subject.next(1);
        // subject.next(2);
        // subject.next(3);
        // subject.next(4);

        // subject.subscribe({
        //     next: (v) => console.log(`ObserverB ${v}`)
        // })

        // subject.next(5);

        ////////// ASYNC SUBJECT /////////////
        // The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers, and only when the execution completes.

        // const subject = new AsyncSubject();

        // subject.subscribe({
        //     next: (v) => console.log(`ObserverA : ${v}`)
        // });

        // subject.next(1);
        // subject.next(2);
        // subject.next(3);
        // subject.next(4);

        // subject.subscribe({
        //     next:(v) => console.log(`ObserverB : ${v}`)
        // });

        // subject.next(5);
        // subject.complete();


    }


}