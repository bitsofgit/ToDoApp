import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LoginService} from './Services/LoginService';
import {LoggerService} from '../Shared/Services/LoggerService';

import {ICredential} from './Interfaces';

@Component({
    //moduleId: module.id,
    selector: '<app-register>',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    creds: ICredential;
    errorMsg: string;
    successMsg: string;
    constructor(private _loginService: LoginService, private _router: Router, private _logger:LoggerService) { }

    ngOnInit() {
        this._logger.log("in ngoninit() of RegisterComponent.");
        this.creds = this.getNewCreds();
    }

    getNewCreds(): ICredential {
        this.errorMsg = "";
        this.successMsg = "";
        return { Username: "", Password: "", Email:"" };
    }

    Cancel(): void {
        this.creds = this.getNewCreds();
    }

    GoToLogin():void{
        this._router.navigate(['/login']);
    }

    Register():void{
            this._loginService.register(this.creds)
            .subscribe(
                data => {
                    console.log(data);
                    this.creds = this.getNewCreds();
                    this.successMsg = "Registration Successful!";
                },
                error => {
                    this.errorMsg = "Registration Failure.";
                    this._logger.log(this.errorMsg);
                }
            );
    }
}