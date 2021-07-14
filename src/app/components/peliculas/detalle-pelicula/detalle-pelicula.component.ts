import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor, Message, Pelicula } from '@shared/models';
import { ActorService, DataService, EstudioService, MessageService, PeliculaService } from '@shared/services';
import { forkJoin, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'pt-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit {

  urlBase: string = '/peliculas/';
  urlEditar: string = 'editar/';
  urlDetale: string = 'detalle/'

  pelicula!: Pelicula;
  actores!: Array<Actor>;
  estudio!: string;

  peliculaLoaded: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private actorService: ActorService,
    private dataService: DataService,
    private estudioService: EstudioService,
    private messageService: MessageService,
    private peliculaService: PeliculaService
  ) { }

  ngOnInit() {

    this.pelicula = new Pelicula();
    this.actores = new Array<Actor>();
    this.estudio = '';
    this.dataService?.ptMenu?.changeTitle('');
    this.recuperarDatosPelicula();
    this.dataService?.ptMenu?.changeShownMenuIcons(true);

  }

  recuperarDatosPelicula() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.peliculaService.getPeliculaById(Number(id)).pipe(
      concatMap(pelicula => forkJoin({
        pelicula: of(pelicula),
        estudio: this.estudioService.getAllEstudios().pipe(
          map(estudios => estudios.find(({ movies }) => movies.some(id => id === pelicula.id)))
          ),
        actores: forkJoin(pelicula.actors.map(actorId => this.actorService.getActorById(actorId)))
      }))
    ).subscribe(({ pelicula, estudio, actores }) => {
      
      this.pelicula = pelicula;
      this.estudio = estudio!.name!;
      this.actores = actores;
      this.peliculaLoaded = true;

      },
      (error: Message) => {
        this.messageService.showError(error);
        this.peliculaLoaded = true;
      }
    );
  }

  editar(item: Pelicula) {

    this.router.navigate([this.urlBase + this.urlEditar + item.id]);
  }

}
