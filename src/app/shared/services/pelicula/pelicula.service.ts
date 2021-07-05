import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../../models/pelicula.model';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  readonly url = 'http://localhost:3000/movies';
  constructor(private http: HttpClient) { }

  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(this.url + '/' + id);

  }

  getAllPeliculas(): Observable<Array<Pelicula>> {
    return this.http.get<Array<Pelicula>>(this.url);
  }

}
