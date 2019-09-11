import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';
import { Helpers } from "../../../../helpers";
import swal from 'sweetalert2';
import { FileOperationService } from '../../services/file-operation.service';

@Component({
    selector: 'email-modal',
    templateUrl: './email-modal.component.html',
})
export class EmailModalComponent implements OnInit {
    emailModal = true;
    emailList = [''];
    emailBody = '';
    selectedFileType = ['swms'];
    constructor(private http: HttpClient,
        private _router: Router, private projectService: ProjectService
        // private fileOperationService: FileOperationService
        ) { }

    ngOnInit(): void { }
    cancelEmail() {
        this._router.navigate(['/project/lifecycle/job-prestart']);
    }
    trackByFn(index, item) {
        return index;
    }
    addemail() {
        this.emailList.push('');
    }
    removeemail(index) {
        this.emailList.splice(index, 1);
    }
    sendEmail() {
        debugger;
        Helpers.setLoading(true);
        let selectedFiles = [];

        // alert(this.selectedFileType);

        this.selectedFileType.forEach(type => {
            if (this.projectService.FileObj[type]) {
                selectedFiles.push(...this.projectService.FileObj[type]);
            }
        });
        // alert(selectedFiles);

     let mailObj = {
            emailIds: this.emailList,
            emailBody: this.emailBody,
            files: selectedFiles,
            quoteId: this.projectService.quoteId
        };
        this.http.post(environment.api_base.apiBase + 'api/project/sendMails', { data: mailObj })
            .subscribe(response => {
                this.emailList = [];
                this.addemail();
                this.emailBody = '';
                this.selectedFileType = ['swms'];
                Helpers.setLoading(false);
                debugger;
                // this._router.navigate(['/project/lifecycle/job-prestart']);

                // alert email sent
                swal({
                  type: 'success',
                  title: 'Success',
                  text: 'Email Sent.',
                  allowOutsideClick: true,
                  allowEscapeKey: false,
                  showConfirmButton: true,
                  timer: 4000
                });
            });
            this._router.navigate(['/project/lifecycle/job-prestart']);

    }
}
