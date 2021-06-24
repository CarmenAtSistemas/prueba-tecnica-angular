import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculaService } from '@shared/services';
import { Pelicula } from '../../../shared/models/pelicula.model';

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

  constructor(
    private router: Router,
    private peliculaService: PeliculaService
  ) { }

  ngOnInit() {
    this.recuperarPeliculas();
  }


  recuperarPeliculas() {
    this.peliculaService.getAllPeliculas().subscribe((res: Array<Pelicula>) => {
      if (res) {
        this.listadoPeliculas = res;
      }
    });
  }

  verDetalle(item: Pelicula) {
    console.log('verDetalle');
    this.router.navigate([this.urlBase + this.urlDetalle + item.id]);
  }

  nuevaPelicula() {
    this.router.navigate([this.urlBase + this.urlFormulario]);
  }

}
