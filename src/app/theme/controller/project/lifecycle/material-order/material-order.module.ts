import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialOrderComponent } from './material-order.component';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';

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
  declarations: [MaterialOrderComponent],
  exports: [MaterialOrderComponent]
})
export class MaterialOrderModule { }
