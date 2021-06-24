import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from './../assets/i18n/es.json';

@Component({
  selector: 'pt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba-tecnica-angular';

  constructor(private translate: TranslateService) {
    translate.setTranslation('es', defaultLanguage);
    translate.setDefaultLang('es');
    translate.use('es');
  }

}
