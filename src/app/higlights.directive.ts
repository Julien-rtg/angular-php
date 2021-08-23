import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { CalculatorDirective } from './calculator.directive';


@Directive({
    selector: '[highlight]'
})
export class HiglightsDirective {
    
    private element: HTMLElement;
    private calculator: CalculatorDirective;
    private bgScreen = 0;

    constructor(element: ElementRef, calculator: CalculatorDirective) { 
        this.element = element.nativeElement;
        this.calculator = calculator;
    }

    @HostBinding('style.backgroundColor') // HOST BINDING = bind style.backgroundColor a l'attribut bgColor = yellow par défaut // this.element.style.backgroundColor = yellow
    @Input()
    bgColor = '';
    
    @HostListener('click') // HOSTLISTENER = quand click sur le selector lance la method en dessous // HOST LISTENER BIND DIRECT AVEC LE SELECTOR
    onClickBg(){
        if(this.bgScreen === 0){
            this.bgColor = 'lightgreen';
            console.log(this.calculator.calculate(100));
            this.bgScreen = 1;
        } else {
            this.bgColor = 'yellow';
            console.log(this.calculator.calculate(1000));
            this.bgScreen = 0;
        }
    }

    ngOnInit(){
       
    }


}
