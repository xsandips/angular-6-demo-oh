import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LiveProjectService } from '../../live-project.service';
import { environment } from '../../../../../../../environments/environment';
import { FileOperationService } from '../../../../services/file-operation.service';

@Component({
  selector: 'app-job-prestart',
  templateUrl: './job-prestart.component.html',
  styleUrls: ['./job-prestart.component.css']
})
export class JobPrestartComponent implements OnInit {
  baseUrl: string;
  constructor(public projectService: LiveProjectService, public fileOperationService: FileOperationService, public router: Router) {
  this.baseUrl = environment.api_base.apiBase;
   }

  ngOnInit() {
    // alert("On Init called from Job-Prestart");

    this.projectService.savedRoute = '/project/lifecycle/job-prestart';
  }

}
