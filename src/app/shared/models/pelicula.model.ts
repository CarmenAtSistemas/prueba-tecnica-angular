import { Actor } from './actor.model';

export class Pelicula {
    id?: number;
    title?: string;
    poster?: string;
    genre?: string[];
    year?: number;
    duration?: number;
    imdbRating?: number;
    actors: Array<number> = new Array();
  }
