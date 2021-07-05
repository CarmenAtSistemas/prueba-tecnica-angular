import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { DuracionHorasMinutosPipe } from './pipes/duracion-horas-minutos.pipe';
import { TagInputModule } from 'ngx-chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpInterceptorHandler } from './interceptors/http-interceptor.handler';


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
    TagInputModule
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
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorHandler,
        multi: true
    }
]
})

export class SharedModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
