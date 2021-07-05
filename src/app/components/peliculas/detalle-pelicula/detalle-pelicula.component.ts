import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor, Estudio, Pelicula } from '@shared/models';
import { ActorService, EstudioService, PeliculaService } from '@shared/services';
import { DataService } from '../../../shared/services/data/data.service';

@Component({
  selector: 'pt-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit {

  urlBase: string = '/peliculas/';
  urlEditar: string = 'editar/';
  urlDetale: string = 'detalle/'

  pelicula: Pelicula = new Pelicula();
  actores: Array<Actor> = new Array();
  estudio: string | undefined;

  peliculaLoaded: boolean = false;
  actoresLoaded: boolean = false;
  estudioLoaded: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private actorService: ActorService,
    private dataService: DataService,
    private estudioService: EstudioService,
    private peliculaService: PeliculaService
    ) { }

  ngOnInit() {

    this.dataService?.ptMenu?.changeTitle('');
    this.recuperarDatosPelicula();
    this.dataService?.ptMenu?.changeShownMenuIcons(true);
    
  }

  recuperarDatosPelicula() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.peliculaService.getPeliculaById(id).subscribe(
          (response: Pelicula) => {
            this.pelicula = response;
            this.peliculaLoaded = true;
            this.dataService.ptMenu.changeTitle(this.pelicula.title + ' (' + this.pelicula.year + ')');
            this.estudioService.getAllEstudios().subscribe(
              (response: Array<Estudio>) => {
                this.estudio =  response?.find(
                  (estudio: Estudio) => estudio.movies?.
                    find(movie=> movie == this.pelicula.id))?.name;
                this.estudioLoaded = true;
              });
             this.pelicula.actors?.forEach((actorId: number) => {
                this.actorService.getActorById(actorId).subscribe((actor: Actor) => {
                this.actores.push(actor);
                this.actoresLoaded = true;
              });
            });
          });
      }
    });
  }

  editar(item: Pelicula) {

    this.router.navigate([this.urlBase + this.urlEditar + item.id]);
  }

}
