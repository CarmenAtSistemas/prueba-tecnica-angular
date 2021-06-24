import { Component, OnInit } from '@angular/core';
import { Actor, Pelicula, Estudio } from '@shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { PeliculaService, ActorService, EstudioService } from '@shared/services';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'pt-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit {

  url: string = '/peliculas/editar/';

  pelicula: Pelicula = new Pelicula();
  actores: Array<Actor> = new Array();
  estudio: string | undefined;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private peliculaService: PeliculaService,
    private estudioService: EstudioService,
    private actorService: ActorService) { }

  ngOnInit(): void {

    this.recuperarDatosPelicula();
  }

  recuperarDatosPelicula() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.peliculaService.getPeliculaById(id).subscribe(
          (response: Pelicula) => {
            this.pelicula = response;
            this.estudioService.getAllEstudios().subscribe(
              (response: Array<Estudio>) => {
                this.estudio =  response?.find(
                  (estudio: Estudio) => estudio.movies?.
                    find(movie=> movie == this.pelicula.id))?.name;
              });
             this.pelicula.actors?.forEach((actorId: number) => {
                this.actorService.getActorById(actorId).subscribe((actor: Actor) => {
                this.actores.push(actor);
              });
            });
          });
      }
    });
  }

  editar(item: Pelicula) {
    this.router.navigate([this.url + item.id]);
  }

}
