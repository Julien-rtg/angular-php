import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HiglightsDirective } from './higlights.directive';
import { LoopDirective } from './loop.directive';
import { IfDirective } from './if.directive';
import { UserDirective } from './user.directive';
import { TestComponent } from './test/test.component';
import { DeviceComponent } from './device/device.component';

@NgModule({
    declarations: [
        AppComponent,
        HiglightsDirective,
        LoopDirective,
        IfDirective,
        UserDirective,
        TestComponent,
        DeviceComponent,
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
