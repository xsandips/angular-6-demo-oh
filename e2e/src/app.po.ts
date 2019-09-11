import { environment } from './../../src/environments/environment.prod';
import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(environment.api_base.apiBase);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
