import { ActualProjectLevel, LocationCTC } from './../../../../../model/project.model';
import { Component, OnInit } from '@angular/core';
import { LiveProjectService } from '../../live-project.service';
import { Budget } from '../../../../../model/project.model';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  actualProjectLevel: ActualProjectLevel;
  locationCTCs: LocationCTC[];
  constructor(public http: HttpClient, public projectService: LiveProjectService) { }

  ngOnInit() {
    // alert("On Init called from Budget");

    this.projectService.savedRoute = '/project/lifecycle/budget';
    this.http.get(environment.api_base.apiBase + 'api/employeetimesheet/locationctc/' + this.projectService.activeQuote.projectId)
      .subscribe(locationCTC => {
        this.locationCTCs = <LocationCTC[]>locationCTC;
        // alert(JSON.stringify('Project Location Level CTC ' + this.projectService.activeQuote._id ));
        for (let i = 0; i < this.locationCTCs.length; i++) {
          this.actualProjectLevel.projectCTC =
            this.actualProjectLevel.projectCTC + this.locationCTCs[i].locationCTC;
        }
        this.actualProjectLevel.projectNetProfit =
          this.actualProjectLevel.projectPrice - this.actualProjectLevel.projectCTC;

        // for (let i = 0; i < this.locationCTCs.length; i++) {
        //   this.projectService.selectedProject.actualProjectLevel.projectCTC =
        //     this.actualProjectLevel.projectCTC + this.locationCTCs[i].locationCTC;
        // }
        // this.projectService.selectedProject.actualProjectLevel.projectNetProfit =
        //   this.actualProjectLevel.projectPrice - this.actualProjectLevel.projectCTC;
      });

  }

  // #region Event binding methods
  addBudget() {
    this.projectService.selectedProject.projectBudget.push(new Budget());
  }

  onChange(type, index = 0) {
    switch (type) {
      case 'blocationcode':
        const locObj = this.projectService.selectedProject.projectBudget[index];
        if (!locObj.locationCode) {
          this.projectService.selectedProject.projectBudget[index].location = '';
          break;
        }
        const locationObject = this.projectService.selectedProject.locations.find(loc => locObj.locationCode === loc.locationCode);
        const materialOrder =
          this.projectService.selectedProject.materialOrders.filter(mos => mos.location === locationObject.locationCode);

        const supplierCost = materialOrder.map(m => {
          return m.supplierCost;
        }).reduce((a, b) => a + b, 0);
        this.projectService.selectedProject.projectBudget[index].location = locationObject.location;
        this.projectService.selectedProject.projectBudget[index].materialRate = supplierCost;
        break;
      default:
        break;
    }
  }

  trackByFn(index, item) {
    return index;
  }

  calculateBudget(index = 0) {

    const currBudget = this.projectService.selectedProject.projectBudget[index];
    this.projectService.selectedProject.projectBudget[index].totalPrice = currBudget.sqmperhr * currBudget.rate + currBudget.materialRate;
    if (index > 0) {
      this.projectService.selectedProject.projectBudget[index].totalBudget =
        this.projectService.selectedProject.projectBudget[index - 1].totalBudget
        - this.projectService.selectedProject.projectBudget[index].totalPrice;
    } else {
      this.projectService.selectedProject.projectBudget[index].totalBudget =
        +this.projectService.selectedProject.cost - this.projectService.selectedProject.profite
        - this.projectService.selectedProject.projectBudget[index].totalPrice;
    }
    this.actualProjectLevel.projectPrice = this.projectService.selectedProject.projectBudget.map(m => {
      return m.totalPrice;
    }).reduce((a, b) => a + b, 0);
    debugger;
    this.actualProjectLevel.projectNetProfit = this.actualProjectLevel.projectPrice - this.actualProjectLevel.projectCTC;
    // let pe = this.projectService.employeeList;
    const rates = this.projectService.selectedProject.locations.map(loc => {
      if (loc.employees.length) {
        loc.employees.filter(emp => {
          const emps = this.projectService.employeeList.find(allEmp => allEmp._id === emp);
          if (emps && emps.employeeTypeName === 'PAYG') {
            return { rate: emps.rate };
          }
        });
      }
      return { rate: 0 };
    });
    this.actualProjectLevel.projectCTC = rates.map(m => {
      return m.rate;
    }).reduce((a, b) => a + b, 0);

    // this.actualProjectLevel.ctc
  }
}

