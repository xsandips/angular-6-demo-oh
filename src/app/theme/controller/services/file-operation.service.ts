import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project/project.service';
import { environment } from '../../../../environments/environment';
import { Helpers } from '../../../helpers';

@Injectable({
  providedIn: 'root'
})
export class FileOperationService {
  // #region Private Variables
  uploadedFiles: any = {
    swms: [],
    sds: [],
    other: [],
    drawing: [],
    finishes: [],
    risk: []
  };
  // #endregion
  constructor(public http: HttpClient, public projectService: ProjectService) {
  }

  onUpload(event, type) {
    debugger;
    this.setUploadDocumentsToView(this.projectService.selectedQuote);
    for (let file of event.files) {
        if (file.objectURL) {
            this.uploadedFiles[type].push({ clientPath: file.objectURL.changingThisBreaksApplicationSecurity, name: file.name });
        } else {
            this.setUploadDocumentsToView(this.projectService.selectedQuote);
            this.uploadedFiles[type].push({ name: file.name });
        }
    }
    let postObj = {
        file: this.uploadedFiles,
        quoteId: this.projectService.selectedProject.quoteId
    };
    this.http.post(environment.api_base.apiBase + 'api/project/upload', postObj).subscribe(res => {
      debugger
       alert("Document Uploded");
    });
    this.projectService.msgs = [];
    this.projectService.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  setUploadDocumentsToView(quote) {
    debugger;
    Helpers.setLoading(true);
    this.http.post(environment.api_base.apiBase + 'api/project/getFiles', { quoteId: this.projectService.selectedQuote._id })
      .subscribe(response => {
        this.projectService.FileObj = response;
        this.uploadedFiles = response;
        Helpers.setLoading(false);
      });
  }

  onFileSelect(event) {
    debugger;
  }

  viewFile(file) {
    let clientPath = file.clientPath || ' ';
    if (clientPath) {
      window.open(clientPath);
      return;
    }
    window.open(file.path.replace('/app/dist/public', ''));
    return false;
  }
  removeFile(file) {
    this.http.post(environment.api_base.apiBase + 'api/project/removeFile', file).subscribe(res => {
      this.setUploadDocumentsToView(this.projectService.selectedQuote);
    });
  }

}

// class uploadedFile {
//   swms: fileKey[];
//   sds: fileKey[];
//   other: fileKey[];
//   drawing: fileKey[];
//   finishes: fileKey[];
//   risk: fileKey[];
// }
// class fileKey {
//   name: string;
//   path: string;
// }
