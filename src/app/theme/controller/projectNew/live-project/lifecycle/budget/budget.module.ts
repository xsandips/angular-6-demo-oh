import { ListboxModule } from 'primeng/listbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { LayoutModule } from '../../../../../layouts/layout.module';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    DialogModule,
    CheckboxModule,
    ListboxModule,
    FieldsetModule,
    TableModule
  ],
  declarations: [BudgetComponent],
  exports: [BudgetComponent]
})
export class BudgetModule { }
