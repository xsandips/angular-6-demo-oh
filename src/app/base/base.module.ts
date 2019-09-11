import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './_directive/only-number.directive';

@NgModule({
    imports: [
        CommonModule,
    ], declarations: [
        OnlyNumberDirective,
    ],
    exports: [
        OnlyNumberDirective,
    ],
})
export class BaseModule {
}