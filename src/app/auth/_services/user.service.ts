import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService {
    
    constructor(private http: Http) {
      
    }

    verify() {
        return this.http.get(environment.api_base.apiBase + 'api/verify', this.jwt()).map((response: Response) => response.json());
    }

    forgotPassword(email: string) {
        return this.http.post(environment.api_base.apiBase + 'api/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get(environment.api_base.apiBase + 'api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(environment.api_base.apiBase + 'api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(environment.api_base.apiBase + 'api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(environment.api_base.apiBase + 'api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(environment.api_base.apiBase + 'api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
