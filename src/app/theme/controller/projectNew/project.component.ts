import { ActiveQuotes } from './../../model/activeQuotes';
import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem, MenuItem, Message } from 'primeng/api';
import { QuoteModel } from "../../model/quote.model";
import { ProjectModel, Address, Material, MaterialOrder, location, Budget } from "../../model/project.model";
import { Helpers } from "../../../helpers"
import { ProjectService } from "./project.service";
import * as _ from "lodash";
import swal from 'sweetalert2';
import { CommonService } from "../../../base/_services/common.service";
import { Variation } from "../../model/project.model";
import { Subject } from "rxjs/Subject";
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'project.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit, OnDestroy {

  // #region Structured Declaration
  projectList: ProjectModel[] = [];
  activeQuoteList: ActiveQuotes[] = [];
  projectDetailsDashborad:any;

  // #endregion

  constructor(private commonService: CommonService, private http: HttpClient, private router: Router,
    public projectService: ProjectService, public route: ActivatedRoute) {


      this.projectDetailsDashborad = [{
        srcUrl:'assets/app/media/img//products/product6.jpg',
        projectName:'Project A',
        address:'Dalal Streed address Location details',
        projectManger:'Henrick Dow',
        startDate:'09.12.2018'
      },
      {
        srcUrl:'assets/app/media/img//products/product10.jpg',
        projectName:'Project B',
        address:'Dalal Streed address Location details',
        projectManger:'Henrick Russel',
        startDate:'09.12.2018'
      },
      {
        srcUrl:'assets/app/media/img//products/product11.jpg',
        projectName:'Project C',
        address:'Dalal Streed address Location details',
        projectManger:'Henrick Petric',
        startDate:'09.12.2018'
      },
    
    ]

  }

  ngOnInit() {
    // alert("On Init called from Project");
    Helpers.setLoading(true);
    this.projectService.isProjectListTable = true;
    this.projectService.selectedProject = new ProjectModel('');
    this.projectService.selectedProject.address = new Address();
    this.projectService.activeIndex = 0;
    this.http.get(environment.api_base.apiBase + 'api/quote/list').subscribe(quoteData => {
    this.activeQuoteList = <ActiveQuotes[]>quoteData;
    this.projectService.savedRoute = '/project';
    this.projectService.activeIndex = 0;
    Helpers.setLoading(false);
    });
  }

  // #region Even Binding methods
  onRowDblclick(quote) {
// alert(JSON.stringify(quote));
    this.projectService.activeQuote = quote;
    this.router.navigate(['./lifecycle'], { relativeTo: this.route });
    this.projectService.isProjectListTable = false;
  }
  // #endregion
  ngOnDestroy() {
    this.projectService.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.projectService.destroy$.unsubscribe();

  }

}


// #region Async Methods
// async getSelectedQuoteDetails(quote)
// {
  // await this.http.get( environment.api_base.apiBase + 'api/quote/', {
  //   params: {
  //     _id: quote._id
  //   }).subscribe(quoteData => {
  //   // console.log("Quotes Data : " + JSON.stringify(quoteData));
  //   this.projectService.selectedQuote = <QuoteModel>quoteData;
  //   alert('Selected Quotes Data from Project Component : ' + JSON.stringify(this.projectService.selectedQuote));

  // });

// }

// #endregion

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

