import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';
import { Helpers } from "../../../../helpers";
import { MaterialOrder, ProjectModel } from '../../../model/project.model';
import { CommonService } from '../../../../base/_services/common.service';
import * as _ from 'lodash';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class AssignEmployeeComponent implements OnInit {
  employees: any[];
  selectedEmployees: any[];
  employeeTypeData: any[];
  index = 0;

  constructor(private http: HttpClient, private cmService: CommonService, private _router: Router,
    private projectService: ProjectService, private route: ActivatedRoute) { }
  empModal = false;
  ngOnInit(): void {
    this.getEmp();
    this.loademployeeTypeData();
    this.empModal = true;
    this.index = +this.route.snapshot.paramMap.get('index');
  }

  // onChange(type, index) {
  //     switch (type) {
  //         case 'employeeType':
  //             debugger;
  //             if (!this.projectService.selectedProject.locations[index].employeeType) {
  //                 this.employeeListArray[index] = this.employeeList;
  //                 break;
  //             }
  //             let emptypeId = this.employeeTypeData.find(type => type._id === this.selectedProject.locations[index].employeeType);
  //             this.employeeListArray[index] = [...this.employeeList.filter(emp => emp['type'] === emptypeId.name)];
  //             break;
  //         default:
  //             break;
  //     }
  // }

  loademployeeTypeData() {
    this.cmService.getEmployeeType().subscribe(data => {
      let emptypes = data;

      this.employeeTypeData = emptypes.map(type => {
        return { label: type.name, value: type.name };
      });
      this.employeeTypeData.unshift({ label: '', value: null });

    },
      error => {

      });
  }

  getEmp() {
    this.cmService.getEmployee().subscribe(fetchedEmp => {
      debugger;
      let emps: any[] = fetchedEmp.data;
      this.employees = fetchedEmp.data;
      // alert("Select Employee : " + this.projectService.projects);
      this.projectService.employeeList = this.employees;

    });
  }

  selectAndClose(done = false) {
    debugger;
    if (done) {
      // alert("Selected Employee: " + this.selectedEmployees);

      this.projectService.updateEmployee.next({ index: this.index, employees: this.selectedEmployees });
      this.projectService.assignEmployees(this.selectedEmployees);
    }
    this._router.navigate([this.projectService.savedRoute]);
    // this.empModal = false;
  }

}
