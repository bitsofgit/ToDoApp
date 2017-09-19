import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';
import { HeaderComponent} from './Header/header.component';

import {AppRoutingModule, routableComponents} from './app-routing.module';

import { SharedModule } from './Shared/shared.module';
import {LoginModule} from './Login/login.module';

import { LoginService } from "./Login/Services/LoginService";
import { ExtensionService } from "./Shared/Services/ExtensionService";
import { LoggerService } from "./Shared/Services/LoggerService";
import { MessageService } from "./Shared/Services/MessageService";

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
    providers: [FormBuilder, LoginService, ExtensionService, LoggerService, MessageService ]
})

export class AppModule { }