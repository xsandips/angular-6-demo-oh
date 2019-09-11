import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../base/_services/common.service';
import { AllLocationtimesheet, DetailLocationtimesheet, TimesheetDetails } from '../../model/timesheet.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-employee-timesheet',
  templateUrl: './employee-timesheet.component.html',
  styleUrls: ['./employee-timesheet.component.css']
})
export class EmployeeTimesheetComponent implements OnInit {
  loading = false;
  init = true;
  allLocationtimesheet: AllLocationtimesheet[] = [];
  paygDetailLocationtimesheet: DetailLocationtimesheet[] = [];
  abnDetailLocationtimesheet: DetailLocationtimesheet[] = [];
  timesheetDetails: TimesheetDetails[] = [];
  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this.loading = true;
    let allLocationtimesheet = [];

    this._commonService.getProjects().subscribe((projects: any[]) => {
      this._commonService.getEmployeeTimesheet().subscribe((timesheet: TimesheetDetails[]) => {
        this.timesheetDetails = timesheet;
        projects.forEach(proj => {
          let differenceTravel = 0;
          allLocationtimesheet.push(proj.locations.map(loc => {
            let getEmp = timesheet.filter(tm => {
              return tm.locationCode == loc.locationCode && tm.ProjectId == proj._id
            });
            debugger;
            getEmp.forEach(emp => {
              let _initial = emp.inTime;
              let fromTime = new Date(_initial);
              let _end = emp.outTime;
              let toTime = new Date(_end);
              differenceTravel += ((toTime.getTime() - fromTime.getTime()) / 36e5);
            });
            return {
              projectName: proj.name,
              projectId: proj._id,
              location: loc.location,
              locationCode: loc.locationCode,
              totalEmployee: loc.employees.length,
              employees: loc.employees,
              totalhrs: differenceTravel,
            };
          }));
        });
        debugger;
        this.allLocationtimesheet = _.flattenDeep(allLocationtimesheet);
        this.loading = false;
      });
    });
  }

  viewDetail(event, timesheet: AllLocationtimesheet) {
    event.preventDefault();
    let EmpTS = new DetailLocationtimesheet();
    this._commonService.getEmployee().subscribe(empDB => {
      debugger;
      let currentProjectTS = this.allLocationtimesheet.filter(allTS => allTS.projectId == timesheet.projectId);
      currentProjectTS.forEach(crproj => {
        crproj.employees.forEach(emp => {
          let EmpDetail = this.timesheetDetails.find(ts => {
            return ts.employeeId == emp && ts.ProjectId == crproj.projectId
          })
          EmpTS.date = EmpDetail ? EmpDetail.inTime : null;
          EmpTS.inTime = EmpDetail.inTime;
          EmpTS.outTime = EmpDetail.outTime;
          EmpTS.projectName = crproj.projectName;
          EmpTS.location = crproj.location;
          EmpTS.EmployeeName = empDB.data.find(empdb => emp == empdb._id).name;
          if (empDB.data.find(empdb1 => empdb1._id == emp).employeeTypeName == 'ABN') {
            this.abnDetailLocationtimesheet.push(EmpTS);
          } else {
            this.paygDetailLocationtimesheet.push(EmpTS);
          }
        });
      })
      // this.allLocationtimesheet.forEach(allTm => {
      //   // this.timesheetDetails.forEach(tsDB => {          
      //   // }); 
      //   this.timesheetDetails.filter(ts=>ts.ProjectId==allTm.projectId)
      //   this.paygDetailLocationtimesheet.push()
      //   this.abnDetailLocationtimesheet.push();
      // })
    })
    this.init = false;
  }

}
