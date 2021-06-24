import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(): Array<any> {
    const menu = [
      {
        label: 'menu.movies',
        path: 'peliculas',
        clickable: true,
        show: true,
        id: 'menu1'
      },
      {
        label: 'menu.actors',
        path: '',
        clickable: true,
        show: true,
        id: 'menu2'
      },
      {
        label: 'menu.studios',
        path: '',
        clickable: true,
        show: true,
        id: 'menu3'
      }

    ];

    return menu;
  }

}
