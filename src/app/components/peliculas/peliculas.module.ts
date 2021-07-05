import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {
  DetallePeliculaComponent,
  FormularioPeliculaComponent,
  ListadoPeliculasComponent
} from './index';
import { PeliculasRoutingModule } from './peliculas-routing.module';



@NgModule({
  declarations: [
    DetallePeliculaComponent,
    FormularioPeliculaComponent,
    ListadoPeliculasComponent
  ],
  imports: [
    PeliculasRoutingModule,
    SharedModule
  ],
  providers: []
})
export class PeliculasModule { }
