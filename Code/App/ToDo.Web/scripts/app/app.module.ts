import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

import { AppComponent }   from './app.component';
import { HeaderComponent} from './Header/header.component';

import {AppRoutingModule, routableComponents} from './app-routing.module';

import { SharedModule } from './Shared/shared.module';
import {LoginModule} from './Login/login.module';

import { LoginService } from "./Login/Services/LoginService";
import { ExtensionService } from "./Shared/Services/ExtensionService";
import { LoggerService } from "./Shared/Services/LoggerService";

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
        AppRoutingModule,
        SharedModule,
        LoginModule
    ],
    bootstrap: [AppComponent],
    providers: [FormBuilder, ExtensionService, LoginService, LoggerService ]
})

export class AppModule { }