export function getAnios() {

    const anios : Array<number> = new Array();
    const anioComienzo =  1900;
    const anioFinal = new Date().getFullYear();
    for(let i = anioComienzo; i<=anioFinal; i++){
        anios.push(i);
    }
    return anios;
}

export function getPuntuaciones() {

    const puntuaciones: Array<number> = new Array();
    for(let i=0; i<=100; i++){
        puntuaciones.push(i/10);
    }
    return puntuaciones;
}
