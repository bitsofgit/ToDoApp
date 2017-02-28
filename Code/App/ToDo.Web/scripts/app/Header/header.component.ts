import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LoginService} from '../Login/Services/LoginService';
import {LoggerService} from '../Shared/Services/LoggerService';

@Component({
    //moduleId: module.id,
    selector: '<app-header>',
    templateUrl: './app/Header/header.component.html'
})
export class HeaderComponent implements OnInit {
    IsAuthenticated: boolean;
    showLogs: boolean;
    logs: string[] = [];
    constructor(private _loginService: LoginService, private _router: Router, private _logger: LoggerService) {
        this._logger.log("constructing HeaderComponent")
    }

    ngOnInit() {
        this.IsAuthenticated = this._loginService.isAuthenticated();
    }

    Logout(): void {
        this._loginService.logout();
        this.IsAuthenticated = false;
        this.goToList();
    }

    Login(): void {
        this._router.navigate(['/login']);
    }

    goToList(): void {
        this._router.navigate(['/about']);
    }

    ShowHideLogs(): void {
        // get logs
        if(this.showLogs == false)
            this.logs = this._logger.logs;

        // flip flag
        this.showLogs = !this.showLogs;
    }
}