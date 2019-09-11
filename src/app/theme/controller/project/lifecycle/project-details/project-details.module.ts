import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../../layouts/layout.module';
import { LocationComponent } from './location/location.component';
import { ScopeComponent } from './scope/scope.component';
import { SightAddressComponent } from './sight-address/sight-address.component';
import { ListboxModule } from '../../../../../../../node_modules/primeng/listbox';
import { DialogModule } from '../../../../../../../node_modules/primeng/dialog';
import { CheckboxModule } from '../../../../../../../node_modules/primeng/checkbox';
import { FieldsetModule } from '../../../../../../../node_modules/primeng/fieldset';
import { TableModule } from '../../../../../../../node_modules/primeng/table';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ListboxModule,
    LayoutModule,
    DialogModule,
    CheckboxModule,
    FieldsetModule,
    TableModule
  ],
  declarations: [
    ProjectDetailsComponent,
    LocationComponent,
    ScopeComponent,
    SightAddressComponent
    ],
  exports: [ProjectDetailsComponent]
})
export class ProjectDetailsModule { }
