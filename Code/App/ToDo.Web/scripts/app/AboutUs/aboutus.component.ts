import { Component, OnInit } from '@angular/core';

import {LoginService} from '../Login/Services/LoginService';
import {LoggerService} from '../Shared/Services/LoggerService';

@Component({
    //moduleId: module.id,
    selector: '<app-aboutus>',
    templateUrl: './app/AboutUs/aboutus.component.html'
})
export class AboutUsComponent implements OnInit {
    msg:string;
    constructor(private _loginService: LoginService, private _logger:LoggerService) { }

    ngOnInit() {
        this._logger.log("In ngoninit() of AboutUsComponent");

        if (this._loginService.isAuthenticated())
            this.msg = "You are logged in!!";
        else
            this.msg = "I dont know who you are!";
    }

    
}