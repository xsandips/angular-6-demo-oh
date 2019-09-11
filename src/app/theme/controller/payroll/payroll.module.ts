import { FieldsetModule } from 'primeng/fieldset';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './../../layouts/layout.module';
import { BaseModule } from '../../../base/base.module';
import { DefaultComponent } from '../../pages/default/default.component';
import { PayrollComponent } from './payroll.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': PayrollComponent,
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
        FormsModule
    ], exports: [
        RouterModule,
    ], declarations: [
        PayrollComponent
    ],
    providers: []
})
export class PayrollModule {
}
