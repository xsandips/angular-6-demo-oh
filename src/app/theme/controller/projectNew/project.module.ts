import { LifecycleComponent } from './live-project/lifecycle/lifecycle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { DefaultComponent } from '../../pages/default/default.component';
import { ProjectComponent } from './project.component';
import {LiveProjectComponent} from './live-project/live-project.component';
import { EmailModalComponent } from './live-project/email-modal/email-modal.component';
import { ProjectService } from './project.service';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { MaterialmailComponent } from './live-project/materialOrderMail/mo.component';
import { AssignEmployeeComponent } from './live-project/employee/employee.component';
import { JobPrestartComponent } from './live-project/lifecycle/job-prestart/job-prestart.component';
import { BudgetComponent } from './live-project/lifecycle/budget/budget.component';
import { VariationComponent } from './live-project/lifecycle/variation/variation.component';
import { MaterialOrderComponent } from './live-project/lifecycle/material-order/material-order.component';
import { ProjectDetailsComponent } from './live-project/lifecycle/project-details/project-details.component';
import { LifecycleModule } from './live-project/lifecycle/lifecycle.module';
import { LiveProjectModule } from "./live-project/live-project-module";

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': ProjectComponent,
                 children: [{
                    path: 'liveproject',
                    component: LiveProjectComponent,
                    children: [{
                        path: 'projectmail',
                        component: EmailModalComponent
                    },
                    {
                        path: 'employee/:index',
                        component: AssignEmployeeComponent
                    },
                    {
                        path: 'materialOrder',
                        component: MaterialmailComponent
                    },
                    {
                      path: 'lifecycle',
                      component: LifecycleComponent,
                      children:
                      [
                      {
                        path: '',
                        component: ProjectDetailsComponent
                      },
                      {
                        path: 'project-details',
                        component: ProjectDetailsComponent
                      },
                      {
                        path: 'job-prestart',
                        component: JobPrestartComponent
                      },
                      {
                        path: 'budget',
                        component: BudgetComponent
                      },
                      {
                        path: 'variation',
                        component: VariationComponent
                      },
                      {
                        path: 'material-order',
                        component: MaterialOrderComponent
                      }
                    ]
                  }
    
                  ]
                }]
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        DialogModule,
        CheckboxModule,
        ListboxModule,
        FieldsetModule,
        TableModule,
        LiveProjectModule,
        LifecycleModule
    ],
    exports: [
        RouterModule,
        ProjectComponent,
    ],
     declarations: [
        ProjectComponent,
        EmailModalComponent,
        MaterialmailComponent,
        AssignEmployeeComponent

    ],
    providers: [ProjectService]
})
export class ProjectModuleNew {
}
