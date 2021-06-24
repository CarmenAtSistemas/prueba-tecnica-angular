import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  DetallePeliculaComponent,
  FormularioPeliculaComponent,
  ListadoPeliculasComponent,
} from './index';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListadoPeliculasComponent },
      { path: 'detalle/:id', component: DetallePeliculaComponent },
      { path: 'editar/:id', component: FormularioPeliculaComponent },
      { path: 'nueva', component: FormularioPeliculaComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
