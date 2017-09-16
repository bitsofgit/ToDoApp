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
    private AUTH_TOKEN:string = "AUTH_TOKEN";
    private USERNAME:string = "USERNAME";

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
            .map(response => {
                let json = response.json();
                //if (!this._ext.isNullOrWhitespace(json) && !this._ext.isNullOrWhitespace(json.token))
                localStorage.setItem("AUTH_TOKEN", json.token.toString());
                    //this.setItem(this.AUTH_TOKEN, json.token.toString());
                localStorage.setItem("USERNAME", creds.Username);
                return json;
            })
            .catch(this.handleError);
    }

    public getUsername():string{
         if(this.isAuthenticated())
             return this.getItem(this.USERNAME);
         else 
            return "";
    }

    public setItem(name: string, val: string): void{
        //localStorage.removeItem(name);
        localStorage.setItem(name, val);
    }

    public getItem(name: string): string{
        return localStorage.getItem(name);
    }

    public removeItem(name: string): void{
        localStorage.removeItem(name);
    }

    public register(creds: ICredential): Observable<Response> {
        this._logger.log("in register of LoginService");

        return this._http.post(LOGIN_URL + '/register', creds)
            .map(this.afterRegister)
            .catch(this.handleError);
    }

    private afterRegister(response: Response){
        console.log(response.json());
        return response.json();
    }

    private saveToken(response: Response) {
        let json = response.json();
        //if (!this._ext.isNullOrWhitespace(json) && !this._ext.isNullOrWhitespace(json.token))
            localStorage.setItem("AUTH_TOKEN", json.token.toString());
            //this.setItem(this.AUTH_TOKEN, json.token.toString());
            //localStorage.setItem("USERNAME", this.uname);
        return json;
    }

    public isAuthenticated(): boolean {
        if (this.getItem(this.AUTH_TOKEN))
            return true;

        return false;
    }

    public getJWT(): string {
        let token = this.getItem(this.AUTH_TOKEN);
        //if (!this._ext.isNullOrWhitespace(token))
            return token;

        //return null;
    }

    public logout(): void {
        this.removeItem(this.USERNAME);
        this.removeItem(this.AUTH_TOKEN);

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