import { Location } from '@angular/common';
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
  showArrow: boolean;

  constructor(
    private location: Location,
    private menuService: MenuService,
    private translateService: TranslateService
  ) {

    this.menu = this.menuService.getMenu();
    this.showSidebar = false;
    this.showArrow = false;

  }

  ngOnInit() {
    this.menu = this.menuService.getMenu();
    (this.location.path().endsWith('peliculas')) && (this.titulo = this.translateService.instant('menu.movies'));
  }

  toggle() {
    if (this.showSidebar) {
      this.showSidebar = false;
    } else {
      this.showSidebar = true;
    }
  }

  back() {
    this.location.back();
  }

  changeTitle(title: string | undefined) {
    this.titulo = title || '';
  }

  changeShownMenuIcons(show: boolean) {
    this.showArrow = show;
  }

}
