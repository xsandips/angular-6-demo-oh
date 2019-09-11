import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariationComponent } from './variation.component';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { FieldsetModule } from 'primeng/fieldset';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    DialogModule,
    CheckboxModule,
    ListboxModule,
    FieldsetModule,
    TableModule,
    FileUploadModule
  ],
  declarations: [VariationComponent],
  exports: [VariationComponent]
})
export class VariationModule { }
