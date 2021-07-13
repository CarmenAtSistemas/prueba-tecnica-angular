import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor, Estudio, Message, Pelicula } from '@shared/models';
import { ActorService, DataService, EstudioService, MessageService, PeliculaService } from '@shared/services';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

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
        
    this.activatedRoute.params
    .pipe(
      concatMap(params => 
        {
          console.log('concatMap1');
          return this.peliculaService.getPeliculaById(params.id);
        }
      ),
      concatMap(pelicula => 
        {
        console.log('concatMap2');
        let observables: Observable<any>[] = [];
        observables.push(of(pelicula));
        observables.push(this.estudioService.getAllEstudios());
        pelicula.actors?.forEach(
          (actorId: number) => observables.push(this.actorService.getActorById(actorId))
        );
        return forkJoin(observables);
        }
      )
    )
    .subscribe(result => 
      { 
        console.log('subscripcion');
        
        this.pelicula = result[0];

        this.estudio = result[1].find(
          (estudio: Estudio) => estudio.movies?.
            find(movie => movie == this.pelicula.id))?.name!;

        this.actores = result.slice(2);

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
