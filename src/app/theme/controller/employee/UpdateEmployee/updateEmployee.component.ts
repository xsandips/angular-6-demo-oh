import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from "../employee.service";
import { CommonService } from "../../../../base/_services/common.service";
import { environment } from "../../../../../environments/environment";
import swal from 'sweetalert2';

@Component({
  templateUrl: 'updateEmployee.component.html'
})

export class UpdateEmployeeComponent implements OnInit {

  //Contant Variable
  employee: any = {
    'address': {
    }
  };
  contractorData: any = [];
  employeeTypeData: any = [];

  sizeLimit = 5000000;
  params_id: any;
  contentBase: any;

  constructor(private router: Router,
    private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.contentBase = environment.api_base.apiBase;
    this.loademployeeTypeData();
    this._route.params.subscribe(params => {
      if (params['id']) {
        this.params_id = params['id'];
      }
    });

  }

  //Load Employee Type Dropdown Data.
  loademployeeTypeData() {
    this._commonService.getEmployeeType().subscribe(
      data => {
        if (data.length) {
          this.employeeTypeData = data;
          this.loadEmployee(this.params_id);
        }
      },
      error => {

      });
  }


  //Load Contractor Dropdown Data.
  loadContractorData(type: any) {
    this._commonService.getContractors(type).subscribe(
      data => {
        if (data.length) {
          this.contractorData = data.json();
        }
      },
      error => {

      });
  }

  //Load Selected Employee Data.
  loadEmployee(id?: number) {
    this._employeeService.getEmployee(id)
      .subscribe(
        res => {
          // To work later
          // this.employee = (<Response>res).json();
          this.employee = (<Response>res).json();
          var empType = this.employeeTypeData.find(x => x._id == this.employee.employeeType_id);
          if (empType.name === 'ABN' || empType.name == 'ACN') {
            this.loadContractorData(empType.name === 'ABN' ? 'own' : 'sub');
          }
        },
        error => {

        });
  }

  onSelectedEmployeeType($event) {
    // tslint:disable-next-line:max-line-length
    if ($event.target.options[$event.target.selectedIndex].text === 'ABN' || $event.target.options[$event.target.selectedIndex].text == 'ACN') {
      this.loadContractorData($event.target.options[$event.target.selectedIndex].text === 'ABN' ? 'own' : 'sub');
    }
    this.employee.contractor_id = '';
    this.employee.claimAmount = '';
    this.employee.licenseNumber = '';
  }

  //Submit Form.
  submitEmoloyeeInfo() {
    this._employeeService.updateEmployee(this.employee)
      .subscribe(
        data => {
          if (data) {
            // tslint:disable-next-line:max-line-length
            swal({ type: 'success', title: 'Updated', text: 'Successfully', allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false, timer: 800 })
              .then((result) => {
                this.cancel();
              });
          }
        },
        error => {

        });
  }

  //Redirect to Employee List View
  cancel() {
    this.router.navigate(['/employee']);
  }

  beforUpload($event, fieldName) {
    let files = <File>$event.target.files[0];
    this.onUploadFile(files, fieldName);
  }

  onUploadFile(files, fieldName) {
    const fd = new FormData();
    fd.append('file', files, files.name);
    fd.append('fieldName', fieldName);
    this._employeeService.upload(fd).subscribe(
      data => {
        if (data) {
          // this.employee[fieldName] = data.json().filePath;
          this.employee[fieldName] = (<Response>data).json();
        }
      },
      error => {

      });
  }

  viewFile(filePath) {
    window.open(this.contentBase + filePath);
  }

  isImage(fileName): boolean {
    if (fileName.match(/\.(jpg|jpeg|png)$/)) {
      return true;
    }
    return false
  }

  isPdf(fileName) {
    if (fileName.match(/\.(pdf)$/)) {
      return true;
    }
    return false
  }

}
