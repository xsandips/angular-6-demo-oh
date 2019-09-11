import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './../../layouts/layout.module';
import { DefaultComponent } from '../../pages/default/default.component';
import { QuoteComponent } from './quote.component';
import { QuoteDocComponent } from './quote-docx/quote-doc.component';
import { DialogModule } from 'primeng/dialog';
import { QuoteService } from './quote.service';
import { AlertComponent } from '../alertbox/alert.component';

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': QuoteComponent,
                children: [
                    {
                        path: 'quotedoc',
                        component: QuoteDocComponent
                    }
                ]
            },

        ],
    },
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, DialogModule
    ], exports: [
        RouterModule,
    ], declarations: [
        QuoteComponent, QuoteDocComponent, AlertComponent
    ],
    providers: [QuoteService]
})
export class QuoteModule {
}