import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Car } from './car';


@Injectable({
    providedIn: 'root'
})
export class CarService {
    baseUrl = 'http://localhost/angular/cars/api';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${this.baseUrl}/ListCar`).pipe(
            map((res:any) => {
                return res['data'];
            },{responseType : 'text'})
        );
    }

    store(car: Car){
        return this.http.post(`${this.baseUrl}/StoreCar`, {data: car}).pipe(
            map((res: any) => {
                return res['data'];
            }, {responseType : 'text'}),
        );
    }

    update(car: Car){
        return this.http.put(`${this.baseUrl}/UpdateCar`, {data: car});
    }

    delete(id: any){
        const params = new HttpParams().set('id', id.toString());

        return this.http.delete(`${this.baseUrl}/DeleteCar`, { params: params });
    }

}
