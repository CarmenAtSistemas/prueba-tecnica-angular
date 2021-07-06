import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TagInputModule } from 'ngx-chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FailedImageDirective } from './directivas/failed-image/failed-image.directive';
import { HttpInterceptorHandler } from './interceptors/http-interceptor.handler';
import { DuracionHorasMinutosPipe } from './pipes/duracion-horas-minutos.pipe';


@NgModule({
  declarations: [
    DuracionHorasMinutosPipe,
    FailedImageDirective
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
    FailedImageDirective,
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
