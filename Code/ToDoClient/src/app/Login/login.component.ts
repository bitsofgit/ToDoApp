import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LoginService} from './Services/LoginService';
import {LoggerService} from '../Shared/Services/LoggerService';
import {MessageService} from '../Shared/Services/MessageService';

import {ICredential} from './Interfaces';

@Component({
    //moduleId: module.id,
    selector: '<app-login>',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    creds: ICredential;
    errorMsg: string;
    
    constructor(private _loginService: LoginService, private _router: Router, private _logger:LoggerService, private _msgService:MessageService) { }


    ngOnInit() {
        this._logger.log("in ngoninit() of LoginComponent.")
        this.creds = this.getNewCreds();
        this._loginService.logout();
    }

    getNewCreds(): ICredential {
        this.errorMsg = "";
        return { Username: "akhildeshpande", Password: "P@ssw0rd!", Email:"" }; // password is populated only for dev purposes
    }

    Login(): void {

        this._loginService.login(this.creds)
            .subscribe(
                data => {
                    this.creds = this.getNewCreds();
                    this._msgService.sendMessage(this._loginService.getUsername());
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

    Register(): void {
        this._router.navigate(['/register']);
    }

    Cancel(): void {
        this.creds = this.getNewCreds();
        
    }
}