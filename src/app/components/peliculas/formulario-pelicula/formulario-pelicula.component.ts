import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getAnios } from '@shared/functions/formulario-funciones';
import { Actor, Estudio, Message, Pelicula } from '@shared/models';
import {
  ActorService,
  DataService,
  EstudioService,
  MessageService,
  PeliculaService
} from '@shared/services';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';


@Component({
  selector: 'pt-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.scss']
})

export class FormularioPeliculaComponent implements OnInit {

  actores: Array<any> = new Array();
  estudios: Array<Estudio> = new Array();
  anios: Array<number> = new Array();
  formularioLoaded: boolean = false;

  peliculaForm: FormGroup = this.formBuilder.group({
    titulo: '',
    poster: '',
    generos: '',
    actores: '',
    estudio: '',
    anio: new Date(),
    duracion: 0,
    puntuacion: 0.00
  });

  pelicula: Pelicula = new Pelicula();

  constructor(
    private actorService: ActorService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private estudioService: EstudioService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private peliculaService: PeliculaService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {

    this.inicializarFormulario();
    this.cargarDatosFormulario();
    this.dataService?.ptMenu?.changeShownMenuIcons(true);
  }

  inicializarFormulario() {
    this.peliculaForm = this.formBuilder.group({
      titulo: '',
      poster: '',
      generos: '',
      actores: '',
      estudio: '',
      anio: new Date(),
      duracion: 0,
      puntuacion: 0.00
    });

  }

  cargarDatosFormulario(){

    forkJoin([this.actorService.getAllActores(), this.estudioService.getAllEstudios()])
    .pipe(
      concatMap((result) => 
        {
          result[0].forEach((actor: Actor) => {
            this.actores.push({ id: actor.id, name: actor.first_name + ' ' + actor.last_name });
          });
  
          this.estudios = result[1]
          this.anios = getAnios();
          
          return this.activatedRoute.params;
        }
      )
    )
    .subscribe((params: Params) => 
      {
        const id = params.id;
        if (id) {
          this.cargarDatosPelicula(id);
        } else {
          this.dataService?.ptMenu?.changeTitle(this.translateService.instant('movie.label.header'));
          this.formularioLoaded = true;
        }
          
      },(error: Message) => {
        this.messageService.showError(error);
        this.formularioLoaded = true;
      }
    );

  }

  cargarDatosPelicula(id: number) {

    this.peliculaService.getPeliculaById(id).subscribe(
      (response: Pelicula) => {
        this.pelicula = response;
        this.dataService?.ptMenu?.changeTitle(this.pelicula.title + ' (' + this.pelicula.year + ')');
        this.peliculaForm.controls.titulo.setValue(this.pelicula.title);
        this.peliculaForm.controls.poster.setValue(
          this.pelicula.poster
        );
        this.peliculaForm.controls.generos.setValue(
          this.pelicula.genre
        );

        const actoresAux: Array<any> = new Array();
        this.actores.forEach(actor => {
          this.pelicula.actors?.forEach(a => {
            if (actor.id == a) actoresAux.push(actor);
          });
        })

        this.peliculaForm.controls.actores.setValue(
          actoresAux
        );

        this.peliculaForm.controls.anio.setValue(this.pelicula.year);
        this.peliculaForm.controls.duracion.setValue(this.pelicula.duration);
        this.peliculaForm.controls.puntuacion.setValue(this.pelicula.imdbRating);
        
        this.peliculaForm.controls.estudio.setValue(
          this.estudios.
            find((estudio: Estudio) => estudio.movies?.
              find(movie => movie == id))?.id
        );

        this.formularioLoaded = true;
      },
      (error: Message) => {
        this.messageService.showError(error);
        this.formularioLoaded = true;
      }
    );
  }

  incrementarDuracion() {
    let duracion: number =  1 * this.peliculaForm.controls.duracion.value;
    duracion++;
    this.peliculaForm.controls.duracion.setValue(duracion);
  }

  decrementarDuracion() {
    let duracion: number = 1 * this.peliculaForm.controls.duracion.value;
    (duracion > 0) && duracion--;
    this.peliculaForm.controls.duracion.setValue(duracion);
  }

  incrementarPuntuacion() {
    let puntuacion: number = 1 * this.peliculaForm.controls.puntuacion.value;
    (puntuacion < 10.00) && (puntuacion = puntuacion +  0.01);
    this.peliculaForm.controls.puntuacion.setValue(puntuacion.toFixed(2));
  }

  decrementarPuntuacion() {
    let puntuacion: number = 1 * this.peliculaForm.controls.puntuacion.value;
    (puntuacion > 0.00) && (puntuacion = puntuacion - 0.01);
    this.peliculaForm.controls.puntuacion.setValue(puntuacion.toFixed(2));
  }

}
