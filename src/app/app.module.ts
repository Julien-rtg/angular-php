import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HiglightsDirective } from './higlights.directive';
import { LoopDirective } from './loop.directive';
import { IfDirective } from './if.directive';
import { UserDirective } from './user.directive';

@NgModule({
    declarations: [
        AppComponent,
        HiglightsDirective,
        LoopDirective,
        IfDirective,
        UserDirective,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
bootstrap: [AppComponent]
})

export class AppModule { }
