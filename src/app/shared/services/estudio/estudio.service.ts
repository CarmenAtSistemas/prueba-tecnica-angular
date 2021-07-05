import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudio } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  readonly url = 'http://localhost:3000/companies';
  constructor(private http: HttpClient) { }

  getEstudioById(id: number): Observable<Estudio> {
    return this.http.get<Estudio>(this.url + '/' + id);
  }

  getAllEstudios(): Observable<Array<Estudio>> {
    return this.http.get<Array<Estudio>>(this.url);
  }

}
