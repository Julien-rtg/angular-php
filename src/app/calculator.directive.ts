import { Injectable } from '@angular/core';

@Injectable({
    providedIn : 'root',
})
export class CalculatorDirective {


    calculate(montantHT: number) : number{
        return montantHT * 1.2;
    }
}
