import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Car } from './car';




@Injectable({
  providedIn: 'root'
})
export class CarService {
    baseUrl = 'https://localhost/api';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${this.baseUrl}/list`).pipe(
            map((res:any) => {
                return res['data'];
            })
        );
    }
}
