import { NgModule } from '@angular/core';
import { DataTableModule } from 'primeng/datatable';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';


@NgModule({
    declarations: [

    ],
    exports: [
        DataTableModule,
        TableModule,
        PanelModule,
        DialogModule,
        EditorModule,
        FormsModule,
        MultiSelectModule,
        StepsModule,
        FileUploadModule,
        GrowlModule,
        DropdownModule
    ],
    imports: [
        DataTableModule,
        TableModule,
        PanelModule,
        EditorModule,
        FormsModule,
        MultiSelectModule,
        StepsModule,
        FileUploadModule,
        GrowlModule,
        DropdownModule
    ]
})
export class ControllerModule {
}