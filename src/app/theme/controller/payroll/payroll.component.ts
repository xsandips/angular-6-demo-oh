import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../base/_services/common.service';
import { ProjectModel, location } from '../../model/project.model';
import { PayG_Employee, Payroll, ABN_Employee, ACN_Employee } from '../../model/payroll';
import { EmployeeTypeEnum } from '../../onehat.enum';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  selectedProject: ProjectModel;
  ProjectList: ProjectModel[] = [];
  detailView = false;
  EmployeePayroll: Payroll = new Payroll();
  employeeList: any[];
  currentIndex = 0;
  empType = '';
  displayNote = false;
  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this._commonService.getProjects().subscribe(res => {
      this.ProjectList = <ProjectModel[]>res;
      debugger;
    });
    this._commonService.getEmployee().subscribe(emp => {
      this.employeeList = emp.data;
    });
  }
  getEmployees(allLocn: location[]) {
    return allLocn.map(l => l.employees.length).reduce((a, b) => a + b, 0);
  }

  onRowclick(project: ProjectModel) {
    let paygmEmp: PayG_Employee;
    let abnEmp: ABN_Employee;
    let acnEmp: ACN_Employee = new ACN_Employee();
    this.EmployeePayroll.PayG_Employees = [];
    for (let i = 0; i < project.locations.length; i++) {
      for (let j = 0; j < project.locations[i].employees.length; j++) {
        const emp = project.locations[i].employees[j];
        paygmEmp = new PayG_Employee();
        abnEmp = new ABN_Employee();
        if (this.employeeList.find(e => e._id == emp).employeeTypeName == EmployeeTypeEnum.PAYG) {
          paygmEmp.employeeName = this.employeeList.find(e => e._id == emp).name;
          paygmEmp.employeeType = this.employeeList.find(e => e._id == emp).employeeTypeName;
          this.EmployeePayroll.PayG_Employees.push(paygmEmp);
        }
        if (this.employeeList.find(e => e._id == emp).employeeTypeName == EmployeeTypeEnum.ABN) {
          abnEmp.employeeName = this.employeeList.find(e => e._id == emp).name;
          abnEmp.employeeType = this.employeeList.find(e => e._id == emp).employeeTypeName;
          this.EmployeePayroll.ABN_Employees.push(abnEmp);
        }
        if (this.employeeList.find(e => e._id == emp).employeeTypeName == EmployeeTypeEnum.ACN) {
          acnEmp.employeeName = this.employeeList.find(e => e._id == emp).name;
          this.EmployeePayroll.ACN_Employees.push(acnEmp);
        }
      }
    }
    debugger;
    this.detailView = true;
  }
  createNote(event, type, i) {
    event.preventDefault();
    this.currentIndex = i;
    this.displayNote = true;
    this.empType = type;
    //this.EmployeePayroll[type][i].note;
  }
  cancel() {
    this.detailView = false;
  }

}
