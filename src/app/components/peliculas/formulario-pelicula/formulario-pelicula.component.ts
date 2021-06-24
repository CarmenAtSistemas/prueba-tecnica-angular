import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Actor, Estudio, Pelicula } from '@shared/models';
import { getAnios, getPuntuaciones } from '@shared/functions/formulario-funciones';
import { ActivatedRoute, Params } from '@angular/router';
import {
  ActorService,
  EstudioService,
  PeliculaService
} from '@shared/services';

@Component({
  selector: 'pt-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.scss']
})

export class FormularioPeliculaComponent implements OnInit {
  
  actores: Array<Actor> = new Array();
  estudios: Array<Estudio> = new Array();
  anios: Array<number> = new Array();
  puntuaciones: Array<number> = new Array();
  
  peliculaForm: FormGroup = this.formBuilder.group({
    titulo: '',
    poster: '',
    generos: [],
    actores: [],
    estudio: '',
    anio: '',
    duracion: '',
    puntuacion: ''
  });

  pelicula: Pelicula = new Pelicula();
   
  constructor(
    private actorService: ActorService,
    private activatedRoute: ActivatedRoute,
    private estudioService: EstudioService,
    private formBuilder: FormBuilder,
    private peliculaService: PeliculaService
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.cargarDatosGenerales();
    this.cargarDatosPeliculaSeleccionada();
 }

  inicializarFormulario() {
    this.peliculaForm = this.formBuilder.group({
      titulo: '',
      poster: '',
      generos: [],
      actores: [],
      estudio: '',
      anio: '',
      duracion: '',
      puntuacion: ''
    });

  }
  
  cargarDatosGenerales() {
    this.actorService.getAllActores().subscribe((response: Actor[]) => {
      this.actores = response;
    });

    this.estudioService.getAllEstudios().subscribe((response: Estudio[]) => {
      this.estudios = response;
    });

    this.anios = getAnios();

    this.puntuaciones = getPuntuaciones();
  
  }

  cargarDatosPeliculaSeleccionada() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params.id;
      if (id) {
        this.obtenerDatosPelicula(id);
      }
    });
  }

  obtenerDatosPelicula(id: number) {
    
        
    this.peliculaService.getPeliculaById(id).subscribe(
      (response: Pelicula) => {
        this.pelicula = response;
        this.peliculaForm.controls.titulo.setValue(this.pelicula.title);
        this.peliculaForm.controls.poster.setValue(
          this.pelicula.poster
        );
        this.peliculaForm.controls.generos.setValue(
          this.pelicula.genre
        );

        this.peliculaForm.controls.actores.setValue(
          this.pelicula.actors
        );
        
        this.peliculaForm.controls.anio.setValue(this.pelicula.year);
        this.peliculaForm.controls.duracion.setValue(this.pelicula.duration);
        this.peliculaForm.controls.puntuacion.setValue(this.pelicula.imdbRating);

        this.estudioService.getAllEstudios().subscribe(
          (response: Array<Estudio>) => {

          this.peliculaForm.controls.estudio.setValue(
            response?.
            find((estudio: Estudio) => estudio.movies?.
                find(movie =>  movie == id))?.id
          );
        });
      }
    );
  }

}
