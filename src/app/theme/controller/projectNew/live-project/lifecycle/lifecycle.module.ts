
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifecycleComponent } from './lifecycle.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialOrderModule } from './material-order/material-order.module';
import { VariationModule } from './variation/variation.module';
import { BudgetModule } from './budget/budget.module';
import { JobPrestartModule } from './job-prestart/job-prestart.module';
import { ProjectDetailsModule } from './project-details/project-details.module';
import { LayoutModule } from '../../../../layouts/layout.module';
// import { AlertComponent } from '../../alertbox/alert.component';
import { CustomAlertComponent } from '../../../../custom-component/custom-alert/custom-alert.component';


@NgModule({
  imports: [
    CommonModule,
    ProjectDetailsModule,
    JobPrestartModule,
    BudgetModule,
    VariationModule,
    MaterialOrderModule,
    RouterModule,
    LayoutModule,



    // DialogModule,
    // CheckboxModule,
    // ListboxModule,
    // FieldsetModule,
    // TableModule,
    // LifecycleModule
  ],
  declarations: [
    LifecycleComponent,
    CustomAlertComponent
  ],
  exports: [LifecycleComponent]
})
export class LifecycleModule { }


// const routes: Routes = [
//   {
//       'path': '',
//       'component': DefaultComponent,
//       'children': [
//           {
//               'path': '',
//               'component': LifecycleComponent,
//               children: [{
//                   path: 'projectmail',
//                   component: ProjectDetailsComponent
//               },
//               {
//                   path: 'job-prestart',
//                   component: JobPrestartComponent
//               },
//               {
//                   path: 'budget',
//                   component: BudgetComponent
//               },
//               {
//                 path: 'material-order',
//                 component: MaterialOrderComponent
//               },
//               {
//                 path: 'variation',
//                 component: BudgetComponent
//               }

//             ]
//           }
//       ]
//   }
// ];

