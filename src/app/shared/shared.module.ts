import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { DuracionHorasMinutosPipe } from './pipes/duracion-horas-minutos.pipe';
import { TagInputModule } from 'ngx-chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    DuracionHorasMinutosPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    TagInputModule,
  ],
  exports: [
    CommonModule,
    DuracionHorasMinutosPipe,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    TagInputModule,
    TranslateModule,
  ]
})

export class SharedModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
