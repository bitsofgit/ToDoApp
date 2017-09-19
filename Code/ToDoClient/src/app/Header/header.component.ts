import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import {LoginService} from '../Login/Services/LoginService';
import {LoggerService} from '../Shared/Services/LoggerService';
import {MessageService} from '../Shared/Services/MessageService';

@Component({
    //moduleId: module.id,
    selector: '<app-header>',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    IsAuthenticated: boolean;
    username: string;
    showLogs: boolean;
    logs: string[] = [];
    subscription: Subscription;

    constructor(private _loginService: LoginService, private _router: Router, private _logger: LoggerService, private _msgService:MessageService) {
        this._logger.log("constructing HeaderComponent")
        this.subscription = this._msgService.getMessage().subscribe(message => {
            this._logger.log(message.text);
            this.username = message.text;
            this.IsAuthenticated = this._loginService.isAuthenticated();
        });
    }

    ngOnInit() {
        this.IsAuthenticated = this._loginService.isAuthenticated();
        if(this.IsAuthenticated)
            this.username = this._loginService.getUsername();
    }

    Logout(): void {
        this._loginService.logout();
        this.IsAuthenticated = false;
        this.username = "";
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
        //if(this.showLogs == false)
            this.logs = this._logger.logs;

        // flip flag
        this.showLogs = !this.showLogs;
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}