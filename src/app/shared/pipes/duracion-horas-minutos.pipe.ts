import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duracion_horas_minutos'
})
export class DuracionHorasMinutosPipe implements PipeTransform {

  transform(value: any): any {
    
    if(!isNaN(value)){

      let horas = Math.floor(value / 60);
      let minutos = Math.floor(value % 60);
      return horas + ' h ' + minutos + ' m';
    }
    return value;
  }

}
