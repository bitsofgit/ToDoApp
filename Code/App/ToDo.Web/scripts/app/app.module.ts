import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

import { AppComponent }   from './app.component';
import {HeaderComponent} from './Header/header.component';
import {AboutUsComponent} from './AboutUs/aboutus.component';
import {PageNotFoundComponent} from './PageNotFound/pagenotfound.component';

import {TodoModule} from './Todo/todo.module';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AboutUsComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        TodoModule
    ],
    bootstrap: [AppComponent],
    providers: [
        FormBuilder
        , appRoutingProviders
    ]
})

export class AppModule { }