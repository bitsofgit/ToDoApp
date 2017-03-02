import { Injectable } from "@angular/core";
import {Http, Response} from "@angular/http";
import {CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';

import {LoginService} from "../../Login/Services/LoginService";
import {LoggerService} from "../../Shared/Services/LoggerService";


@Injectable()
export class CanActivateAuthGuard implements CanActivate{
    constructor(private _router:Router, private _loginService:LoginService, private _logger: LoggerService) {
        this._logger.log("constructing CanActivateAuthGuard");
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this._logger.log("Inside canActivate route guard")

        if (this._loginService.isAuthenticated()) {
            this._logger.log("User is authenticated. Allowing to move forward.")
            return true;
        } else {
            this._logger.log("User is not authenticated. Redirecting to Login.")
            this._router.navigate(['/login']);
            return false;
        }
    }
}