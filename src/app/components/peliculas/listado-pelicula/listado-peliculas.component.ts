import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Message, Pelicula } from '@shared/models';
import { DataService, MessageService, PeliculaService } from '@shared/services';

@Component({
  selector: 'pt-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.scss']
})
export class ListadoPeliculasComponent implements OnInit {

  listadoPeliculas: Array<Pelicula> = new Array();
  urlBase: string = '/peliculas/';
  urlDetalle: string = 'detalle/';
  urlFormulario: string = 'nueva';
  listadoLoaded: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private messageService: MessageService,
    private peliculaService: PeliculaService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.recuperarPeliculas();
    this.dataService?.ptMenu?.changeShownMenuIcons(false);
    this.dataService?.ptMenu?.changeTitle(this.translateService.instant('menu.movies'));
  }

  recuperarPeliculas() {
    this.peliculaService.getAllPeliculas().subscribe((response: Array<Pelicula>) => {
      if (response) {
        this.listadoPeliculas = response;
      }
      this.listadoLoaded = true;
    },
    (error: Message) => {
      this.messageService.showError(error);
    });
  }

  verDetalle(item: Pelicula) {
    this.router.navigate([this.urlBase + this.urlDetalle + item.id]);
  }

  nuevaPelicula() {
    this.router.navigate([this.urlBase + this.urlFormulario]);
  }

}
