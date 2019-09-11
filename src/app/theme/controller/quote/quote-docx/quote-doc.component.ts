import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteModel } from "./../../../model/quote.model";
import { QuoteService } from "../quote.service";
import { saveAs } from 'file-saver';
import { environment } from "../../../../../environments/environment";

@Component({
    templateUrl: 'quote-doc.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../quote.component.css']
})

export class QuoteDocComponent implements OnInit {
    display = false;
    quote: QuoteModel;
    
    @ViewChild('downloadForm') el: ElementRef;
    constructor(private http: HttpClient, private _router: Router, private route: ActivatedRoute, private quoteService: QuoteService) {
      

    }
    ngOnInit() {
        if (!this.quoteService.selectedQuote) {
            this._router.navigate(['/quotes'], { relativeTo: this.route });
            return;
        }
        this.display = true;
        this.quote = this.quoteService.selectedQuote;
    }
    print() {
        debugger;
        this.convertImagesToBase64();
        this.http.post(environment.api_base.apiBase + 'api/quote/saveDocx', { html: this.el.nativeElement['innerHTML'], name: this.quote.name, id: this.quote._id }, { responseType: 'blob', observe: 'response' }).subscribe((file) => {
            debugger;
            let filename = this.quote.name + '.docx';
            saveAs(file['body'], filename);
        })
    }
    convertImagesToBase64() {
        var regularImages = document.querySelectorAll("img");
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        [].forEach.call(regularImages, function (imgElement) {
            // preparing canvas for drawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            ctx.drawImage(imgElement, 0, 0);
            // by default toDataURL() produces png image, but you can also export to jpeg
            // checkout function's documentation for more details
            var dataURL = canvas.toDataURL();
            imgElement.setAttribute('src', dataURL);
        })
        canvas.remove();
    }
    cancel() {
        this.display = false;
        this._router.navigate(['/quotes'], { relativeTo: this.route });
    }
}
