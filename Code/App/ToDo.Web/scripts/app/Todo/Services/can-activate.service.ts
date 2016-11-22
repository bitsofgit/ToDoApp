import { Injectable } from "@angular/core";
import {Http, Response} from "@angular/http";
import {CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';

@Injectable()
export class CanActivateAuthGuard implements CanActivate{
    constructor(private _router:Router) {
        console.log("constructing CanActivateAuthGuard");
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log("Inside canActivate route guard");

        // if user is logged in
        return true;
        //else go to login page
        //this._router.navigate(['/login'], { queryParams: { redirectsTo: state.url } });
        //return false;

    }
}