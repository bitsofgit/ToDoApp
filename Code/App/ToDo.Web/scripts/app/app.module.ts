import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

import { AppComponent }   from './app.component';
import { HeaderComponent} from './Header/header.component';

import {TodoModule} from './Todo/todo.module';

import {AppRoutingModule, routableComponents} from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        routableComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TodoModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent],
    providers: [FormBuilder]
})

export class AppModule { }