import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[loop]'
})
export class LoopDirective {

    @Input('loop')
    loopNumber = 0;
    
    private template: TemplateRef<any>; // TEMPLATE IS THE ELEMENT TO LOOP
    private viewContainer: ViewContainerRef; // VIEW CONTAINER IS THE COMMENT ELEMENT WHERE TO INSERT OUR TEMPLATE

    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        this.template = templateRef;
        this.viewContainer = viewContainerRef;
    }

    ngOnInit(){
        
        for(let i = 0; i < this.loopNumber; i++){
            this.viewContainer.createEmbeddedView(this.template, {
                index: i,
            });
        }

    }

}
