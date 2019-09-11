import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './../../layouts/layout.module';
import { BaseModule } from '../../../base/base.module';
import { DefaultComponent } from '../../pages/default/default.component';
import { EmployeeTimesheetComponent } from './employee-timesheet.component';


const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': EmployeeTimesheetComponent,
            },
            
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes), 
        LayoutModule,
        BaseModule,
    ], exports: [
        RouterModule,
    ], declarations: [
        EmployeeTimesheetComponent
    ],
    providers: []
})
export class EmployeeTimesheetModule {
}