import { Injectable } from '@angular/core';
import { QuoteModel } from '../../model/quote.model';

@Injectable()
export class QuoteService {
    selectedQuote: QuoteModel;
    constructor() {
    }
    get quoteModel() {
        return this.selectedQuote;
    }
    set quoteModel(quote: QuoteModel) {
        this.selectedQuote = quote;
    }
}
