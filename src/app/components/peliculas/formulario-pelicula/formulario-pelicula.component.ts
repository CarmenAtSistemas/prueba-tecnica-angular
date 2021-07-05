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
    puntuacion: 0
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
    this.cargarDatosGenerales();
    this.cargarDatosPeliculaSeleccionada();
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
      puntuacion: 0
    });

  }

  cargarDatosGenerales() {
    this.actorService.getAllActores().subscribe((response: Actor[]) => {
      response.forEach((actor: Actor) => {
        this.actores.push({ id: actor.id, name: actor.first_name + ' ' + actor.last_name });
      });
    });

    this.estudioService.getAllEstudios().subscribe((response: Estudio[]) => {
      this.estudios = response;
    });

    this.anios = getAnios();

  }

  cargarDatosPeliculaSeleccionada() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params.id;
      if (id) {
        this.obtenerDatosPelicula(id);
      } else {
        this.formularioLoaded = true;
        this.dataService?.ptMenu?.changeTitle(this.translateService.instant('movie.label.header'));
      }
    });
  }

  obtenerDatosPelicula(id: number) {

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

        this.estudioService.getAllEstudios().subscribe(
          (response: Array<Estudio>) => {

            this.peliculaForm.controls.estudio.setValue(
              response?.
                find((estudio: Estudio) => estudio.movies?.
                  find(movie => movie == id))?.id
            );
          });
        this.formularioLoaded = true;
      },
      (error: Message) => {
        this.messageService.showError(error);
      }
    );
  }

  incrementarDuracion() {
    let duracion: number = this.peliculaForm.controls.duracion.value;
    duracion++;
    this.peliculaForm.controls.duracion.setValue(duracion);
  }

  decrementarDuracion() {
    let duracion: number = this.peliculaForm.controls.duracion.value;
    (duracion > 0) && duracion--;
    this.peliculaForm.controls.duracion.setValue(duracion);
  }

  incrementarPuntuacion() {
    let puntuacion: number = this.peliculaForm.controls.puntuacion.value;
    (puntuacion < 10.00) && (puntuacion = puntuacion + 0.01);
    this.peliculaForm.controls.puntuacion.setValue(puntuacion);
  }

  decrementarPuntuacion() {
    let puntuacion: number = this.peliculaForm.controls.puntuacion.value;
    (puntuacion > 0.00) && (puntuacion = puntuacion - 0.01);
    this.peliculaForm.controls.puntuacion.setValue(puntuacion);
  }

}
