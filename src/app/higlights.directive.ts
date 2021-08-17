import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[highlight]'
})
export class HiglightsDirective {
    
    private element: HTMLElement;
    private highlight(color: string) {
        this.element.style.backgroundColor = color;
    }
    
    constructor(element: ElementRef) { 
        this.element = element.nativeElement;
        
    }


    @HostListener('mouseenter')onMouseEnter() {
        this.highlight('yellow');
    }
    
    @HostListener('mouseleave')onMouseLeave() {
        this.highlight('');
    }



}
