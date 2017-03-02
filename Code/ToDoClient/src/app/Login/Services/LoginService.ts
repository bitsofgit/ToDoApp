import { Injectable } from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';

import {ICredential} from "../Interfaces";
import {ExtensionService} from "../../Shared/Services/ExtensionService";
import {LoggerService} from "../../Shared/Services/LoggerService";

const LOGIN_URL = "https://localhost:44388/api/auth";
//const SUBITEM_URL = "api/subitem";

@Injectable()
export class LoginService {
    private JWT: string = "JWT";

    constructor(private _http: Http, private _ext: ExtensionService, private _logger: LoggerService) {
        this._logger.log("constructing loginservice");
    }

    public getJWTHeaderOption(): RequestOptions {
        let token = this.getJWT();
        if (token != null) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        } else {
            throw new Error("Unauthorized request.");
        }
    }

    public login(creds: ICredential): Observable<Response> {
        this._logger.log("in login of LoginService");

        return this._http.post(LOGIN_URL + '/token', creds)
            .map(this.saveToken)
            .catch(this.handleError);
    }

    private saveToken(response: Response) {
        let json = response.json();
        //if (!this._ext.isNullOrWhitespace(json) && !this._ext.isNullOrWhitespace(json.token))
            localStorage.setItem("AUTH_TOKEN", json.token.toString());

        return json;
    }

    public isAuthenticated(): boolean {
        if (localStorage.getItem("AUTH_TOKEN"))
            return true;

        return false;
    }

    public getJWT(): string {
        let token = localStorage.getItem("AUTH_TOKEN");
        //if (!this._ext.isNullOrWhitespace(token))
            return token;

        //return null;
    }

    public logout(): void {
        localStorage.removeItem("AUTH_TOKEN");

        //TODO: call server to logout as well
    }

    private handleError(error: any) {
        // in a real world app, we might use a remote logging infrastructure
        // we'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        this._logger.log(errMsg);
        return Observable.throw(errMsg);
    }
}