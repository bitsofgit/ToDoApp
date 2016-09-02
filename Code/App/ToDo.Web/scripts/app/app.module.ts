import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable

import { AppComponent }   from './app.component';
import {HeaderComponent} from './Header/header.component';
import {TodoComponent,
    OverdueComponent,
    AddItemComponent,
    EditItemComponent,
    SubItemComponent,
    ItemService} from './Todo/index';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TodoComponent,
        OverdueComponent,
        AddItemComponent,
        EditItemComponent,
        SubItemComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    bootstrap: [
        AppComponent],
    providers: [
        ItemService
        //, HTTP_PROVIDERS
        , FormBuilder]


})
export class AppModule { }