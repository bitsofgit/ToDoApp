import { Injectable } from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import {LoggerService} from "./LoggerService";

@Injectable()
export class ExtensionService {

    constructor(private _http: Http, private _logger: LoggerService) {
        this._logger.log("constructing extension service.");
    }

    isNullOrWhitespace(input:string): boolean {
        if (typeof input === 'undefined' || input == null)
            return true;

        return input.replace(/\s/g, '').length < 1;
    }
}