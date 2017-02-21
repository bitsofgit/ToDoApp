import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LoginService} from './Services/LoginService';
import {LoggerService} from '../Shared/Services/LoggerService';

import {ICredential} from './Interfaces';

@Component({
    //moduleId: module.id,
    selector: '<app-login>',
    templateUrl: './app/login/login.component.html'
})
export class LoginComponent implements OnInit {
    creds: ICredential;
    errorMsg: string;
    constructor(private _loginService: LoginService, private _router: Router, private _logger:LoggerService) { }


    ngOnInit() {
        this._logger.log("in ngoninit() of LoginComponent.")
        this.creds = this.getNewCreds();
    }

    getNewCreds(): ICredential {
        return { Username: "", Password: "" };
    }

    Login(): void {

        this._loginService.login(this.creds)
            .toPromise()
            .then(data => {
                if (this._loginService.isAuthenticated()) {
                    this.creds = this.getNewCreds();
                    this.goToList();
                } else {
                    this.errorMsg = "Login Failure.";
                }
            });
    }

    goToList(): void {
        this._router.navigate(['/todo']);
    }

}