import { environment } from './../../../../environments/environment.prod';
import { Injectable, } from "@angular/core";
import { RequestOptions, Response, Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {
    constructor(private _http: Http) {
    }

    addEmployee(data: any) {
        return this._http.post(environment.api_base.apiBase + 'api/employee', data).map(this.extractData).catch(this.handleError);
    }

    updateEmployee(data: any) {
        return this._http.put( environment.api_base.apiBase + 'api/employee/' + data._id , data)
        .map(this.extractData).catch(this.handleError);
    }

    deleteEmployee(_id: Number) {

        return this._http.delete(environment.api_base.apiBase + 'api/employee/' + _id).map(this.extractData).catch(this.handleError);
    }

    getEmployee(_id?: number) {
        let url = environment.api_base.apiBase +  'api/employees';
        if (_id) {
            url = environment.api_base.apiBase +  'api/employees/' + _id;
        }
        return this._http.get(url).map(this.extractData).catch(this.handleError);
    }

    upload(data) {
        return this._http.post(environment.api_base.apiBase +  'api/employees/upload', data)
        .map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        return res || {};
        // let body = res.json();
        // return body || { };
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
