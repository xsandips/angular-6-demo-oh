import { Injectable, } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';

@Injectable()
export class CommonService {

  constructor(private _http: Http) {


    }

    getContractors(type?: any) {
        let url = 'api/contractors';
        if (type) {
            url = 'api/contractors?type=' + type;
        }
        return this._http.get(environment.api_base.apiBase + url).map(this.extractData).catch(this.handleError);
    }

    getProjects(): Observable<any> {
        return this._http.get(environment.api_base.apiBase + 'api/project').map(this.extractData).catch(this.handleError);
    }

    getEmployeeTimesheet(): Observable<any> {
        return this._http.get(environment.api_base.apiBase + 'api/employeetimesheet').map(this.extractData).catch(this.handleError);
    }

    getEmployeeType() {
        return this._http.get(environment.api_base.apiBase + 'api/employeeTypes').map(this.extractData).catch(this.handleError);
    }
    getEmployee(_id?: number) {
        let url = 'api/employees';
        if (_id) {
            url = 'api/employee/' + _id;
        }
        return this._http.get(environment.api_base.apiBase + url).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {

        return res.json() || {};
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
