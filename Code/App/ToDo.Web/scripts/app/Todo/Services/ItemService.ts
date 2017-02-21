import { Injectable } from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';

import {IItem, ISubItem, IPriority} from "../Interfaces";
import {LoginService} from "../../Login/Services/LoginService";
import {LoggerService} from "../../Shared/Services/LoggerService";


const ITEM_URL = "api/todo";
const SUBITEM_URL = "api/subitem";

@Injectable()
export class ItemService {
    constructor(private _http: Http, private _loginService: LoginService, private _logger: LoggerService) {
        this._logger.log("constructing itemservice");
    }

    getPriorities(): Observable<IPriority[]> {
        this._logger.log("calling itemservice.getPriorities");

        return this._http.get(ITEM_URL + '/getpriority', this._loginService.getJWTHeaderOption())
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    getItems(): Observable<IItem[]> {
        this._logger.log("calling itemservice.getItems");

        // TODO: The call to get jwt header should be overridden in the http layer
        return this._http.get(ITEM_URL, this._loginService.getJWTHeaderOption())
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    getItemById(id: number): Observable<IItem> {
        this._logger.log("calling itemservice.getItemById : " + id);

        return this._http.get(ITEM_URL + "/" + id, this._loginService.getJWTHeaderOption())
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    private sendJsonResponse(response: Response) {
        return response.json();
    }

    private handleError(error: any) {
        // in a real world app, we might use a remote logging infrastructure
        // we'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this._logger.log(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    addItem(item: IItem): Observable<IItem> {
        this._logger.log("calling itemservice.addItem");

        return this._http.post(ITEM_URL, item)
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    updateItem(id: number, item: IItem): Observable<IItem> {
        this._logger.log("calling itemservice.updateItem");

        return this._http.put(ITEM_URL + "/" + id, item, this._loginService.getJWTHeaderOption())
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    deleteItem(id: number): Observable<string> {
        this._logger.log("calling itemservice.deleteitem");

        return this._http.delete(ITEM_URL + "/" + id, this._loginService.getJWTHeaderOption())
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    // subitems
    addSubItem(subItem: ISubItem): Observable<ISubItem> {
        this._logger.log("calling itemservice.addSubItem");

        return this._http.post(SUBITEM_URL, subItem, this._loginService.getJWTHeaderOption())
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    deleteSubItem(id: number): Observable<string> {
        this._logger.log("calling itemservice.deleteSubitem");

        return this._http.delete(SUBITEM_URL + "/" + id, this._loginService.getJWTHeaderOption())
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }
}