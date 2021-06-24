import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import {
  DetallePeliculaComponent,
  FormularioPeliculaComponent,
  ListadoPeliculasComponent,
} from './index';

@NgModule({
  declarations: [
    DetallePeliculaComponent,
    FormularioPeliculaComponent,
    ListadoPeliculasComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class PeliculasModule { }
