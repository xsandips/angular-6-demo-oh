import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../project.service';
import { location, ProjectModel, Address } from '../../../../model/project.model';
import swal from 'sweetalert2';
import { HttpClient } from '../../../../../../../node_modules/@angular/common/http';
import { QuoteModel } from '../../../../model/quote.model';
import { Subject } from '../../../../../../../node_modules/rxjs';
import { environment } from '../../../../../../environments/environment';
import { Helpers } from '../../../../../helpers';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  //#region Local Veriable
  destroy$: Subject<boolean> = new Subject<boolean>();
  empListModal = false;
  locationEmployee: any = [];

  //#endregion

  constructor(public projectService: ProjectService, public http: HttpClient) {

  }

  trackByFn(index, item) {
    return index;
  }

  async ngOnInit() {
    Helpers.setLoading(true);
    this.projectService.isProjectListTable = false;
    // alert("On Init called from ProjectDetails");

    this.projectService.savedRoute = '/project/lifecycle/project-details';

    // this.projectService.updateEmployee.takeUntil(this.destroy$).subscribe(res => this.updateEmployee(res));

    if (this.projectService.activeQuote.projectStatus === 'Complete') {
      this.projectService.isComplete = true;

      // get selected project details from server if project status= complete
      await this.http.get(environment.api_base.apiBase + 'api/project/' + this.projectService.activeQuote.projectId)
        .subscribe(projectData => {
          debugger;
          this.projectService.selectedProject = <ProjectModel>projectData;
          this.projectService.projects = this.projectService.selectedProject;
        });
    } else {
      this.projectService.isComplete = false;
    }
    debugger;
    // get selected quote details from server
    await this.http.get(environment.api_base.apiBase + 'api/quote/selectedquote/' + this.projectService.activeQuote._id)
      .subscribe(quoteData => {
        this.projectService.selectedQuote = <QuoteModel>quoteData;
        this.projectService.selectedProject.quote_date = this.projectService.selectedQuote.date;
        this.projectService.selectedProject.name = this.projectService.selectedQuote.name;
        this.projectService.selectedProject.scopeDetail = this.projectService.selectedQuote.scopeDetail;
        this.projectService.selectedProject.cost = this.projectService.selectedQuote.totalCost;
        this.projectService.selectedProject.quoteId = this.projectService.selectedQuote._id;
        debugger;
        // this.projectService.selectedProject.address = new Address();
        Helpers.setLoading(false);

      });

  }
  addAddress() {
    if (this.projectService.selectedProject.locations.length) {
      // tslint:disable-next-line:max-line-length
      const isEmpSelect = this.projectService.selectedProject.locations[this.projectService.selectedProject.locations.length - 1].employees.length > 0;
      if (!isEmpSelect) {
        swal({ text: 'Please Select Employees...' });
        return;
      }
    }
    this.projectService.selectedProject.locations.push(new location());
    debugger
  }

  onLocationChange(location, index) {
    const uniqname = this.projectService.selectedProject.name +
                   this.projectService.selectedProject.locations[index].location + Math.floor(Math.random() * (999 - 100 + 1) + 100);
    this.projectService.selectedProject.locations[index].locationCode = uniqname;
}

showEmployee(index) {
  this.locationEmployee = this.projectService.employeeListArray;
  debugger;
this.projectService.selectedProject.locations[index].employees = this.projectService.employeeListArray;
// alert(this.projectService.selectedProject.locations[index].employees);
  this.empListModal = true;
}

removeLocation(index) {
  this.projectService.selectedProject.locations.splice(index, 1);
}
}
