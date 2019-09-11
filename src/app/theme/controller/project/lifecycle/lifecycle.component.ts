import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomAlertComponent } from '../../../custom-component/custom-alert/custom-alert.component';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.css'],
})
export class LifecycleComponent implements OnInit {
  items: MenuItem[];
  @ViewChild('alert') alertComp: CustomAlertComponent;
  alertmessage = 'Do you want to save the data !! ';

  constructor(public projectService: ProjectService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    // alert("On Init called from LifeCycle");

    this.projectService.isProjectListTable = false;
    this.setSteps();
    this.projectService.savedRoute = '/project/lifecycle';
    // debugger;
    this.alertComp.message = 'Do you want to save the data !! ';
  }

  setSteps() {
    this.items = [{
      label: 'Project',
      command: (event: any) => {
        // debugger;
        this.router.navigate(['./project-details'], {relativeTo: this.route});
        this.projectService.activeIndex = 0;
        this.alertComp.show();
      }
    },
    {
      label: 'Job Prestart',
      command: (event: any) => {
        this.router.navigate(['./job-prestart'], {relativeTo: this.route});
        this.projectService.activeIndex = 1;
        this.alertComp.show();
      }
    },
    {
      label: 'Budget',
      command: (event: any) => {
        this.router.navigate(['./budget'], {relativeTo: this.route});
        this.projectService.activeIndex = 2;
        this.alertComp.show();
      }
    },
    {
      label: 'Variation',
      command: (event: any) => {
        // debugger;
        this.router.navigate(['./variation'], {relativeTo: this.route});
        this.projectService.activeIndex = 3;
        this.alertComp.show();
      }
     },
    {
      label: 'Material Order',
      command: (event: any) => {
        this.router.navigate(['./material-order'], {relativeTo: this.route});
        this.projectService.activeIndex = 4;
        this.alertComp.show();
      }
    }
    ];
  }
  callSubmit() {
    this.projectService.submit();
}

}
