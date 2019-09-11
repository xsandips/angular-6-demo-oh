import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'alert-box',
    templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {
    display = false;
    @Input() message;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onSubmit = new EventEmitter<boolean>();
    constructor() { }
    ngOnInit(): void {
        this.display = false;
    }

    show() {
        this.display = true;
    }
    close() {
        this.display = false;
    }
    submit() {
        this.display = false;
        this.onSubmit.emit();
    }

}
