import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { LiveProjectComponent } from './live-project.component';
// import { EmailModalComponent } from './email-modal/email-modal.component';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
// import { MaterialmailComponent } from './materialOrderMail/mo.component';
// import { AssignEmployeeComponent } from './employee/employee.component';
import { LifecycleModule } from './lifecycle/lifecycle.module';
import { LiveProjectService } from './live-project.service';
// const routes: Routes = [
//     {
//         'path': '',
//         'component': DefaultComponent,
//         'children': [
//             {
//                 'path': '',
//                 'component': LiveProjectComponent,
//                 children: [{
//                     path: 'projectmail',
//                     component: EmailModalComponent
//                 },
//                 {
//                     path: 'employee/:index',
//                     component: AssignEmployeeComponent
//                 },
//                 {
//                     path: 'materialOrder',
//                     component: MaterialmailComponent
//                 },
//                 {
//                   path: 'lifecycle',
//                   component: LifecycleComponent,
//                   children:
//                   [
//                   {
//                     path: '',
//                     component: ProjectDetailsComponent
//                   },
//                   {
//                     path: 'project-details',
//                     component: ProjectDetailsComponent
//                   },
//                   {
//                     path: 'job-prestart',
//                     component: JobPrestartComponent
//                   },
//                   {
//                     path: 'budget',
//                     component: BudgetComponent
//                   },
//                   {
//                     path: 'variation',
//                     component: VariationComponent
//                   },
//                   {
//                     path: 'material-order',
//                     component: MaterialOrderComponent
//                   }
//                 ]
//               }
//               ]
//             }
//         ]
//     }
// ];
@NgModule({
    imports: [
        CommonModule,
        // RouterModule.forChild(routes),
        LayoutModule,
        DialogModule,
        CheckboxModule,
        ListboxModule,
        FieldsetModule,
        TableModule,
        LifecycleModule
    ],
    exports: [
        RouterModule,
        LiveProjectComponent
    ],
    declarations: [
        LiveProjectComponent,
        // EmailModalComponent,
       // MaterialmailComponent,
       // AssignEmployeeComponent
    ],
    providers: [LiveProjectService]
})
export class LiveProjectModule {
}