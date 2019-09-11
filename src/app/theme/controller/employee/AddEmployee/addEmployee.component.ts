// import { Component, OnInit,EventEmitter, AnimationKeyframe} from "@angular/core";
import { Component, OnInit,EventEmitter} from "@angular/core";

import { Router } from '@angular/router';
import { EmployeeService } from "../employee.service";
import { CommonService } from "../../../../base/_services/common.service";
import {environment} from "../../../../../environments/environment";
import swal from 'sweetalert2';


@Component({
    templateUrl: 'addEmployee.component.html',
})

export class AddEmployeeComponent implements OnInit {

    //Contant Variable
    employee:any={
       'address':{
       }
    };
    contractorData: any=[];
    employeeTypeData: any=[];

    contentBase: any;

    constructor(private router: Router,
        private _employeeService: EmployeeService,
        private _commonService: CommonService
    ) {
    }

    ngOnInit() {
       this.contentBase = environment.api_base.apiBase;
       this.loademployeeTypeData();
    }

    // Load Employee Type Dropdown Data.
    loademployeeTypeData()
    {
        this._commonService.getEmployeeType().subscribe(
        data => {
            if (data.length) {
                this.employeeTypeData = data;
            }
        },
        error => {

        });
    }

    //Load Contractor Dropdown Data.
    loadContractorData(type : any)
    {
        this._commonService.getContractors(type).subscribe(
            data => {
                if (data.length) {
                    this.contractorData = data;
                }
            },
            error => {

            });
    }

    //Submit Form.
    submitEmoloyeeInfo() {
        this._employeeService.addEmployee(this.employee)
        .subscribe(
        data => {
            if (data) {
                 swal({ type: 'success', title: 'Saved', text: 'Successfully',  allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false, timer: 800 })
                 .then((result) => {
                    this.cancel();
                });
            }
        },
        error => {

        });

    }

    // Redirect to Employee List View
    cancel() {
        this.router.navigate(['/employee']);
    }

    beforUpload($event, fieldName) {
       let files = <File>$event.target.files[0];
       this.onUploadFile(files, fieldName);
    }

    onUploadFile(files, fieldName)
    {
          const fd = new FormData();
          fd.append('file', files, files.name);
          fd.append('fieldName', fieldName);
          this._employeeService.upload(fd).subscribe(
            data => {
                if (data) {
                    //  swal({ type: 'success', title: 'Upload', text: 'Successfully',  allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false, timer: 800 })
                    //  .then((result) => {
                    //     console.log(data.json().filePath);
                    //      this.employee[fieldName]=data.json().filePath;
                    // })

                    // To correct later
                    // this.employee[fieldName]=data.json().filePath;
                    // To correct later
                    this.employee[fieldName] = (<Response>data).json();
                }
            },
            error => {

        });
    }

    viewFile(filePath)
    {
        window.open(this.contentBase + filePath);
    }

    onSelectedEmployeeType($event)
    {
        if($event.target.options[$event.target.selectedIndex].text=='ABN'||$event.target.options[$event.target.selectedIndex].text=='ACN')
        {
            this.loadContractorData($event.target.options[$event.target.selectedIndex].text=='ABN'?'own':'sub');
        }
        this.employee.contractor_id = '';
        this.employee.claimAmount = '';
        this.employee.licenseNumber = '';
    }

    isImage(fileName): boolean {
        if (fileName.match(/\.(jpg|jpeg|png)$/)) {
           return true;
        }
        return false;
    }

    isPdf(fileName) {
        if (fileName.match(/\.(pdf)$/)) {
           return true;
        }
        return false;
    }
}
