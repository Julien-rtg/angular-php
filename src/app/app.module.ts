import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HiglightsDirective } from './higlights.directive';

@NgModule({
    declarations: [
        AppComponent,
        HiglightsDirective
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
