import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'user',
  template: ` 
    <h3> {{firstName}} {{lastName}} </h3>
    <ng-content></ng-content>
    <p> {{age}} </p>
    <button (click)="onClickDelete()" >Delete</button>
    <input #newName type="text" placeholder="New Name"/>
    <button (click)="onClickUpdate(newName.value)"> Update </button>
  `,
  // templateUrl : path // for html files instead of write here

})
export class UserDirective {

    private element: HTMLDivElement;

    @Input('first-name')
    firstName?: string;

    @Input('last-name')
    lastName?: string;

    @Input()
    age?: number;

    constructor(element: ElementRef) { 
        this.element = element.nativeElement;
    }

    ngOnInit(){}

    onClickDelete(){
        this.element.remove();
    }

    onClickUpdate(newName: string){
        this.lastName = newName;
    }


}
