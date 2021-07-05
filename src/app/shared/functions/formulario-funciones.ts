export function getAnios() {

    const anios : Array<number> = new Array();
    const anioComienzo =  1900;
    const anioFinal = new Date().getFullYear();
    for(let i = anioComienzo; i<=anioFinal; i++){
        anios.push(i);
    }
    return anios;
}
