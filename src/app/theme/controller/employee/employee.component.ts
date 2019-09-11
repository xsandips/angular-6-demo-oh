import { Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { EmployeeService } from "./employee.service";
import swal from 'sweetalert2';

@Component({
    templateUrl: 'employee.component.html',
    styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
    employeeList = [];
    selectedEmployee: any;

    constructor(private router: Router,
        private _employeeService: EmployeeService)
     {
     }

    ngOnInit(){
       this.loadEmployee();
    }

    loadEmployee()
    {
        this._employeeService.getEmployee()
        .subscribe(
        res => {
          // To work later
            // this.employeeList = (<Response>res).json();
        },
        error => {
            console.log('in error');
        });
    }

    getEmployeeLength(key,value?:any)
    {
       return this.employeeList.filter(item => {
               if (value)
               {
                 return item[key] = value;
               }
               else {
                  return item[key];
               }
           }).length
    }

    addEmployee(id){
        this.router.navigate(['/employee/add-employee']);
    }

    editEmployee(id){
        this.router.navigate(['/employee/edit-employee',id]);
    }

    preConfirmDeleteEmployee(id)
    {
        swal({
            title: 'Are you sure?',
            text: "Do you want to delete employee?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#66BB6A',
            cancelButtonColor: '#9a9caf',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
              this.deleteEmployee(id);
            }
        })
    }

    deleteEmployee(id)
    {
        this._employeeService.deleteEmployee(id)
        .subscribe(
        res => {
            swal({ type: 'success', title: 'Deleted', text: 'Successfully', showConfirmButton: false, timer: 800 });
            this.loadEmployee();
        },
        error => {

        });

    }
}
