import { ActiveQuotes } from './../../../model/activeQuotes';
import { Injectable } from '@angular/core';
import { MaterialOrder, ProjectModel, ActualProjectLevel } from '../../../model/project.model';
import { Subject } from 'rxjs';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { QuoteModel } from '../../../model/quote.model';
import { Helpers } from '../../../../helpers';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api';
import { environment } from '../../../../../environments/environment';
import { CommonService } from '../../../../base/_services/common.service';
import swal from 'sweetalert2';


@Injectable()
export class LiveProjectService {

  // #region Structured Declaration
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedQuote: QuoteModel;
  selectedProject: ProjectModel;
  private allProjectDetails: ProjectModel;
  activeQuote: ActiveQuotes;
  msgs: Message[] = [];
  isProjectListTable = false;
  isComplete = false;
  profitePercent = 0;
  savedRoute: string;
  employeeListArray: any = [];
  // #endregion

  private file: any;
  private MODetails: MaterialOrder[];
  updateEmployee: Subject<any> = new Subject<any>();
  public employeeList = [];
  actualProjectLevel: ActualProjectLevel = new ActualProjectLevel();
  quoteId: string;
  activeIndex = 0;
  get FileObj() {
    // debugger;
    return this.file;
  }
  set FileObj(file) {
    // debugger;
    this.file = file;
  }
  get moDetails() {
    return this.MODetails;
  }
  set moDetails(detail) {
    this.MODetails = detail;
  }
  get projects() {
    return this.allProjectDetails;
  }
  set projects(projects) {
    this.allProjectDetails = projects;
  }
  constructor(public router: Router, public route: ActivatedRoute, public http: HttpClient, public commonService: CommonService) {

  }


  // #region Routing Methods
  redirectTo(redirect: string, nextIndex: number) {
    this.router.navigate(['project/lifecycle/' + redirect], { relativeTo: this.route });
    this.activeIndex = nextIndex;
    this.submit();
    // alert("URL : "+redirect + "Index" + this.activeIndex );
  }


  cancel() {
    this.selectedProject = new ProjectModel('');
    this.selectedQuote = new QuoteModel();
    this.router.navigate(['project'], { relativeTo: this.route });
     this.isProjectListTable = true;
    window.scrollTo(0, 0);
  }

  submit() {
    Helpers.setLoading(true);
    if (this.activeQuote.projectId === '0') {
      this.http.post(environment.api_base.apiBase + 'api/project', this.selectedProject)
        .subscribe(projectData => {
          this.selectedProject = <ProjectModel>projectData;
          this.projects = this.selectedProject;
          this.activeQuote.projectId = this.selectedProject._id;
          Helpers.setLoading(false);
          swal({ type: 'success', title: 'Saved', text: 'Successfully !!', allowOutsideClick: false,
                 allowEscapeKey: false, showConfirmButton: false, timer: 1000 });
        });
    } else {
      this.http.put(environment.api_base.apiBase + 'api/project/' + this.activeQuote.projectId, this.selectedProject)
        .subscribe(data => {
          swal({ type: 'success', title: 'Saved', text: 'Successfully !!',
                 allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false, timer: 1000 });
          Helpers.setLoading(false);
        });
    }
  }

    assignEmployees(data) {
      debugger;
      // alert("Selected Employee: " + JSON.stringify(data));

    this.employeeListArray.push('');
    this.employeeListArray = data.map(emp => {
      return { label: emp.name, value: emp.name };
    });

    // alert("this.employeeListArray : " + JSON.stringify(this.employeeListArray));

    this.selectedProject.locations[this.selectedProject.locations.length - 1].employees = data;

  }

}
  // .subscribe(data => {
  //   debugger;
  //   alert('Record Inserted :' + data);

  // this.http.get(environment.api_base.apiBase + 'api/project/quote/' + this.activeQuote._id)
  //   .subscribe(projectData => {
  //     alert("Selected project Data after save before mapping :" + JSON.stringify(projectData));

  //     this.selectedProject = <ProjectModel>projectData;
  //     this.projects = this.selectedProject;
  //     this.activeQuote.projectId = this.selectedProject._id;
  //     alert("Selected project Data after Mapping :" + JSON.stringify(this.selectedProject));

  //     alert("Selected project Id :" + this.activeQuote.projectId);
  //   });

  //   Helpers.setLoading(false);
  // });




  // #endregion

  // #region
  // loadEmployee() {
  //     this.commonService.getEmployee()
  //         .subscribe(res => {
  //             const empList = res.json().data;
  //             this.employeeList = empList.map(emp => {
  //                 return { label: 'Name: ' + emp.name + ' - Type: ' + emp.employeeTypeName, value: emp._id, type: emp.employeeTypeName };
  //             });
  //         },
  //             error => {
  //                 console.log('in error');
  //             });
  // }
  // endregion


