import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '@shared/services/menu/menu.service';

@Component({
  selector: 'pt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: Array<any>;
  showSidebar: boolean;
  titulo: string = '';

  constructor(
    private menuService: MenuService,
    public translate: TranslateService
  ) {

    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
    this.menu = this.menuService.getMenu();
    this.showSidebar = false;
  }

  ngOnInit() {
    this.menu = this.menuService.getMenu();
  }

  toggle() {
    if (this.showSidebar) {
      this.showSidebar = false;
    } else {
      this.showSidebar = true;
    }
  }

  changeTitle(title: string) {
    this.titulo = title;
  }
}
