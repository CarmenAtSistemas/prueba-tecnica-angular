import { Pelicula } from './pelicula.model';

export class Estudio {
    id?: number;
    name?: string;
    country?: string;
    createYear?: number[];
    employees?: number;
    rating?: number;
    movies: Array<number> = new Array();
  }