import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actor } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  readonly url = 'http://localhost:3000/actors';
  constructor(private http: HttpClient) { }

  getActorById(id: number): Observable<Actor> {
    return this.http.get<Actor>(this.url + '/' + id);
  }

  getAllActores(): Observable<Array<Actor>> {
    return this.http.get<Array<Actor>>(this.url);
  }

}
