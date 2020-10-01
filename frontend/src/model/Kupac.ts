
export default class Kupac {

    id: number;
    naziv: string;
    pib: string;

    constructor(id: number, naziv: string, pib: string) {
        this.id = id;
        this.naziv = naziv;
        this.pib = pib;
    }
    public getId() {
 
        return this.id;
    }
 
    public setId(id: number) {
 
        this.id = id;
    }
 
    public getNaziv(){
        return this.naziv;
    }

    public setNaziv(naziv:string){
        this.naziv = naziv;
    }

    public getPiv(){
        return this.pib;
    }

    public setPib(pib:string){
        this.pib = pib;
    }
}