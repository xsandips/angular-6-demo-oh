import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {
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
