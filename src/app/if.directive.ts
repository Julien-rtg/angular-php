import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[if]'
})
export class IfDirective {

    @Input("if")
    condition: any;

    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
        
    }

    ngOnInit(){

        if(this.condition){
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        
    }
    
}
