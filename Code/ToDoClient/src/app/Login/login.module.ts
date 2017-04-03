import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { SharedModule } from "../Shared/shared.module";

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    exports: [LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        SharedModule
    ]
})

export class LoginModule { }