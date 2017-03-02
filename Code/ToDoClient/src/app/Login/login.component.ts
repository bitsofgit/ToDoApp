import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LoginService} from './Services/LoginService';
import {LoggerService} from '../Shared/Services/LoggerService';

import {ICredential} from './Interfaces';

@Component({
    //moduleId: module.id,
    selector: '<app-login>',
    templateUrl: 'login.component.html'
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
        this.errorMsg = "";
        return { Username: "", Password: "" };
    }

    Login(): void {

        this._loginService.login(this.creds)
            .subscribe(
                data => {
                    this.creds = this.getNewCreds();
                    this.goToList();
                },
                error => {
                    this.errorMsg = "Login Failure.";
                    this._logger.log(this.errorMsg);
                }
            );
    }

    goToList(): void {
        this._router.navigate(['/todo']);
    }

    Cancel(): void {
        this.creds = this.getNewCreds();
        
    }

}