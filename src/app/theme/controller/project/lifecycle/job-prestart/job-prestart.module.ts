import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPrestartComponent } from './job-prestart.component';
import { FieldsetModule } from 'primeng/fieldset';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    DialogModule,
    CheckboxModule,
    ListboxModule,
    FieldsetModule,
    TableModule
  ],
  declarations: [JobPrestartComponent],
  exports: [JobPrestartComponent]
})
export class JobPrestartModule { }
