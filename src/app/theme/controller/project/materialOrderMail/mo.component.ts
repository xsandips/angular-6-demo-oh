import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';
import { Helpers } from '../../../../helpers';
import { MaterialOrder } from '../../../model/project.model';
import { environment } from '../../../../../environments/environment';
//import * as _ from 'lodash';

@Component({
    selector: 'mo-mail',
    templateUrl: './mo.component.html',
    styleUrls: ['./mo.component.css']
})
export class MaterialmailComponent implements OnInit {
    moDetails: MaterialOrder[];
    emailModal = true;
    subject = '';
    @ViewChild('mailpdf') mailpdf: ElementRef;
    constructor(private http: HttpClient, private _router: Router, private projectService: ProjectService) { }

    ngOnInit(): void {
        this.moDetails = this.projectService.moDetails;
    }

    uploadPdf() {
        let emails = this.moDetails.map(mo => mo.email);
        let emailInfo = {
            emailIds: emails,
            emailBody: 'PFA Material Order...',
            subject: this.subject
        };
        Helpers.setLoading(true);
        this.http.post(environment.api_base.apiBase + 'api/project/mo/' + this.projectService.quoteId, { html: this.mailpdf.nativeElement['innerHTML'] })
        .subscribe(res => {
            this.http.post(environment.api_base.apiBase + 'api/project/momail/' + this.projectService.quoteId, { data: emailInfo })
            .subscribe(res => {
                Helpers.setLoading(false);
                this.emailModal = false;
                this._router.navigate(['/project']);

            });
        });
    }
    cancelEmail() {
        this._router.navigate([this.projectService.savedRoute]);
    }
}
