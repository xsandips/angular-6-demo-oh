import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteModel } from "../../model/quote.model";
import { QuoteService } from "./quote.service";
import { AlertComponent } from "../alertbox/alert.component";
import { Helpers } from "../../../helpers";
import { environment } from "../../../../environments/environment";
import { FileOperationService } from "../services/file-operation.service";
import swal from "sweetalert2";



@Component({
    templateUrl: 'quote.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./quote.component.css']
})

export class QuoteComponent implements OnInit {
    quotes = [];
    alert = false;
    quoteFormActive = false;
    quoteInfo: QuoteModel;
    quoteReady = false;
    selectedQuote: any;
    uploadedPriceFiles: any[] = [];
    emailList: string[] = [];
    @ViewChild('alert') alertComp: AlertComponent;
    @ViewChild('docForm') el: ElementRef;
    disableQuoteField = false;
    alertmessage = 'Are You Sure!!';
    emailModal = false;
    loadingDT = false;
    emailBody = ' ';
    baseUrl: string;

    constructor(
      private http: HttpClient, private _router: Router,
      private route: ActivatedRoute,
      private quoteService: QuoteService,
      public fileOperationService: FileOperationService) {

        this.baseUrl = environment.api_base.apiBase;
    }

    ngOnInit() {
        this.loadingDT = true;
        this.quoteInfo = new QuoteModel();
        this.quoteInfo.cost.push({ cost: 0, heading: '' });
        //this.quotes = this.getData();
        this.http.get(environment.api_base.apiBase + 'api/quote').subscribe(data => {
            this.quotes = [];
            let quotes: QuoteModel[] = <QuoteModel[]>data;
            for (var i = quotes.length - 1; i >= 0; i--) {
                this.quotes.push(quotes[i]);
            }
            this.quotes = quotes;
            this.loadingDT = false;
        });
    }
    preview() {
        // this.http.post(environment.api_base.apiBase + 'api/quote/saveDocx', this.quoteInfo).subscribe(data => {

        // });
        this._router.navigate(['/quotes/quotedoc'], { relativeTo: this.route });

    }
    addemail() {
        this.emailList.push('');
    }
    removeemail(index) {
        this.emailList.splice(index, 1);
    }
    addCost() {
        this.quoteInfo.cost.push({ cost: 0, heading: '' });
    }
    removeCost(index) {
        this.quoteInfo.cost.splice(index, 1);
    }
    costChange() {
        if (this.quoteInfo.cost.length) {
            let totalAmnt = 0;
            this.quoteInfo.cost.forEach(c => {
                totalAmnt += Number(c.cost);
            });
            this.quoteInfo.gstCost = totalAmnt / 10;
            this.quoteInfo.totalCost = Number(totalAmnt) + this.quoteInfo.gstCost;
        }
    }
    emailQuote() {
        this.emailModal = true;
        debugger
        this.emailList.push(this.quoteInfo.email);
    }
    trackByFn(index, item) {
        return index;
    }
    sendEmail() {
        let emailObj = {
            emailBody: this.emailBody,
            emailIds: this.emailList,
            name: this.quoteInfo.name,
            id: this.selectedQuote['_id']
        };
        this.http.post(environment.api_base.apiBase + 'api/quote/shareQuote', emailObj).subscribe(data => {
            debugger;
            console.log(data);
            this.emailBody = '';
            this.emailList = [];
            setTimeout(() => {
                this.emailModal = false;
                swal({
                  type: 'success',
                  title: 'Success',
                  text: 'Email Sent.',
                  allowOutsideClick: true,
                  allowEscapeKey: false,
                  showConfirmButton: true,
                  timer: 4000
                });
            }, 2000);
        });
    }
    cancelEmail() {
        this.emailList = [];
    }
    addQuote() {
        this.quoteFormActive = true;
        this.quoteReady = false;
        this.selectedQuote = null;
        this.resetOk();
    }
    getUploadpriceQuote() {
        Helpers.setLoading(true);
        this.http.get(environment.api_base.apiBase + 'api/quote/getpriceQuote/' + this.selectedQuote['_id']).subscribe(data => {
            debugger;
            this.uploadedPriceFiles = <any>data;
            Helpers.setLoading(false);
        });
    }
    onRowDblclick(quote) {

        if (quote) {
            this.selectedQuote = quote;
        } else {
            quote = this.selectedQuote;
        }
        this.getUploadpriceQuote();
        this.quoteService.selectedQuote = quote;
        this.quoteReady = true;
        if (this.selectedQuote['status'] !== 'Complete') {
            this.quoteInfo = this.selectedQuote;
            this.quoteFormActive = true;
            this.disableQuoteField = false;
            return;
        }
        this.disableQuoteField = true;
    }
    statusChange(status, quote) {
        this.loadingDT = true;
        this.quoteInfo = quote;
        this.quoteInfo.outcome = status;
        this.submit();
    }
    onUpload(event) {
        debugger
        this.getUploadpriceQuote();
    }
    submit() {
      // alert(' Submit method called ');
              // var blob = new Blob([this.el.nativeElement.innerHTML], { type: 'text/csv' });
        // var url = window.URL.createObjectURL(blob);
        // window.open(url);
        const id = this.quoteInfo['_id'];
        // delete this.quoteInfo['_id'];
        const data = this.quoteInfo;
        // const url = id ? environment.api_base.apiBase + : environment.api_base.apiBase + 'api/quote/';
        try {
            if (id) {
                this.http.put(environment.api_base.apiBase + 'api/quote/' + id , data).subscribe(quotedata => {
                    console.log('quote update......', quotedata);
                    this.ngOnInit();
                    this.quoteFormActive = false;
                    this.loadingDT = false;
                });
            } else {
                this.http.post(environment.api_base.apiBase + 'api/quote/', data).subscribe(quotedata => {
                    console.log('quote update......', quotedata);
                    this.ngOnInit();
                    this.quoteFormActive = false;
                });
            }

            this.quoteFormActive = false;
            swal({
              type: 'success',
              title: 'Done',
              text: 'Quote data saved.',
              allowOutsideClick: true,
              allowEscapeKey: false,
              showConfirmButton: true,
              timer: 4000
            });

        } catch (e) {
            this.quoteFormActive = false;
            this.loadingDT = false;
            swal({
              type: 'error',
              title: 'Failed',
              text: 'Something went wrong.',
              allowOutsideClick: true,
              allowEscapeKey: false,
              showConfirmButton: true,
              timer: 4000
            });
        }
    }
    cancel() {
        this.quoteFormActive = false;
    }
    reset() {
        this.alertComp.show();

    }
    resetOk() {
        this.quoteInfo = new QuoteModel();
        this.quoteInfo.cost.push({ cost: 0, heading: '' });
    }
    getData() {
        return [{
            "_id": "5acfd2514f885b0cdc0b61e8",

            "cost": 1356,
            "srno": "0111",
            "name": "my quote",
            "date": "2018-04-13T00:00:00.000Z",
            "status": "Complete",
            "success": "No",
            "reject": "NA",
            "comment": "my first quote ",
            "tender": "adsdsd",
            "details": "<p>aasdasdasdasd<\/p><p>asdas<\/p><p>sadasd<\/p>",
            "quoteReason": "<p>asdsad<\/p><p>asd<\/p><p>a<\/p><p>d<\/p><p>a<\/p><p>dasdsadasds<\/p>",
            "scopeDetail": "<ul><li>asdasdsad<\/li><li>asd<\/li><li>ad<\/li><li>ad<\/li><li>asasd<\/li><\/ul>",
            "externalSubstrate": "<ol><li>asd<\/li><li>da<\/li><li>asdasdad<\/li><\/ol>",
            "gstCost": 135.6,
            "totalCost": 1356135.6,
            "__v": 0
        },
        {
            "_id": "5acfd6059ab0b10d68e9396a",
            "cost": 966,
            "srno": "00012",
            "name": "qw",
            "date": "2018-04-13T00:00:00.000Z",
            "status": "Pending",
            "success": "No",
            "reject": "NA",
            "comment": "my quotes first....",
            "details": "<p>\tqwwwqqwq\tw<\/p><p>q\tw<\/p><p>qw\tqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww<\/p>",
            "quoteReason": "<ol><li>\tqw\tqwq\tw<\/li><li class=\"ql-indent-1\">qw<\/li><li class=\"ql-indent-2\">qw<\/li><li class=\"ql-indent-3\">qw<\/li><li class=\"ql-indent-4\">qw<\/li><\/ol>",
            "scopeDetail": "<ul><li class=\"ql-indent-1\">qw\tw<\/li><li class=\"ql-indent-2\">qw<\/li><li class=\"ql-indent-3\">qw<\/li><li class=\"ql-indent-4\">qw<\/li><\/ul>",
            "gstCost": 96.6,
            "totalCost": 1062.6,
            "__v": 0
        },
        {
            "_id": "5acfd863ec3a3e0f005758bb",
            "cost": 963,
            "srno": "002",
            "name": "dasd",
            "date": "2018-04-13T00:00:00.000Z",
            "status": "Pending",
            "success": "Yes",
            "reject": "NA",
            "comment": "asdsadas",
            "tender": "sadds",
            "details": "<p>sadsadsdsassdas<\/p><p>asd<\/p>",
            "quoteReason": "<ol><li>sadsadsa<\/li><li>asdsad<\/li><\/ol>",
            "scopeDetail": "<ol><li>asdsadsad<\/li><li>asdsdsddsa<\/li><\/ol>",
            "gstCost": 96.3,
            "totalCost": 1059.3,
            "__v": 0
        },
        {
            "_id": "5acfd98ae437a10778e36fa6",
            "cost": 9632,
            "srno": "001",
            "name": "trytry",
            "date": "2018-04-12T00:00:00.000Z",
            "status": "Pending",
            "success": "No",
            "reject": "NA",
            "comment": "rtyryr",
            "tender": "rtyrty",
            "details": "<p>rtyrtyrtyytry<strong>rtyrtyry<\/strong><\/p>",
            "quoteReason": "<ol><li>rtyrtyty<\/li><li>tryty<\/li><\/ol>",
            "scopeDetail": "<ul><li>rtytry<\/li><\/ul>",
            "gstCost": 963.2,
            "totalCost": 10595.2,
            "__v": 0
        },
        {
            "_id": "5ad065556ca618001e59ed72",
            "cost": 3737,
            "srno": "1234",
            "name": "ABC",
            "date": "2018-04-13T00:00:00.000Z",

            "status": "Pending",
            "reject": "NA",
            "comment": "xyyz",
            "details": "<p>hususu<\/p>",
            "quoteReason": "<p>gdhdeywb<\/p>",
            "scopeDetail": "<p>gsywbvwg<\/p>",
            "externalSubstrate": "<p>hswbn<\/p>",
            "internalSubstrate": "<p>rw23r2<\/p>",
            "gstCost": 373.7,
            "totalCost": 4110.7,
            "__v": 0
        }];
    }
}
