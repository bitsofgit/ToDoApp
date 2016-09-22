import { Injectable } from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import {IItem, ISubItem, IPriority} from "./Interfaces";

const ITEM_URL = "api/todo";
const SUBITEM_URL = "api/subitem";

@Injectable()
export class ItemService {
    constructor(private _http: Http) {
        console.log("constructing itemservice");
    }

    getPriorities(): Observable<IPriority[]> {
        console.log("calling itemservice.getPriorities");

        return this._http.get(ITEM_URL + '/getpriority')
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    getItems(): Observable<IItem[]> {
        console.log("calling itemservice.getItems");

        return this._http.get(ITEM_URL)
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    getItemById(id: number): Observable<IItem> {
        console.log("calling itemservice.getItemById : " + id);

        return this._http.get(ITEM_URL + "/" + id)
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
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    addItem(item: IItem): Observable<IItem> {
        console.log("calling itemservice.addItem");

        return this._http.post(ITEM_URL, item)
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    updateItem(id: number, item: IItem): Observable<IItem> {
        console.log("calling itemservice.updateItem");

        return this._http.put(ITEM_URL + "/" + id, item)
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    deleteItem(id: number): Observable<string> {
        console.log("calling itemservice.deleteitem");

        return this._http.delete(ITEM_URL + "/" + id)
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    // subitems
    addSubItem(subItem: ISubItem): Observable<ISubItem> {
        console.log("calling itemservice.addSubItem");

        return this._http.post(SUBITEM_URL, subItem)
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }

    deleteSubItem(id: number): Observable<string> {
        console.log("calling itemservice.deleteSubitem");

        return this._http.delete(SUBITEM_URL + "/" + id)
            .map(this.sendJsonResponse)
            .catch(this.handleError);
    }
}