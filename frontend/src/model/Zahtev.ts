import Kupac from "./Kupac";
import Radnik from "./Radnik";
import StavkaZahteva from "./StavkaZahteva";


export default class Zahtev{
    id:number;
    datum: Date|undefined
    opis:string;
    kupac:Kupac;
    potpisao:Radnik;
    primio:Radnik;
    stavke:StavkaZahteva[];
    
    constructor(id:number,datum: Date,opis:string,kupac:Kupac,potpisao:Radnik,primio:Radnik,stavke:StavkaZahteva[]){
        this.id = id;
        this.datum = datum;
        this.opis = opis;
        this.kupac = kupac;
        this.potpisao = potpisao;
        this.primio = primio;
        this.stavke = stavke;
    }
    public getId() {

        return this.id;
    }
    
    public setId(id: number) {
    
        this.id = id;
    }
    
    public getDatum() {
    
        return this.datum;
    }
    
    public setDatum(datum: Date) {
    
        this.datum= datum;
    }
    
    
    public getKupac() {
    
        return this.kupac;
    }
    
    public setKupac(kupac: Kupac) {
    
        this.kupac= kupac;
    }

    public getPotpisao() {
    
        return this.potpisao;
    }
    
    public setPotpisao(potpisao: Radnik) {
    
        this.potpisao= potpisao;
    }

    public getPrimio() {
    
        return this.primio;
    }
    
    public setPrimio(primio: Radnik) {
    
        this.primio= primio;
    }

    public getOpis(){
        return this.opis;
    }

    public setOpis(opis:string){
        this.opis = opis;
    }

    public getStavke() {

        return this.stavke;
    }
    
    public setStavke(stavke: StavkaZahteva[]) {
    
        this.stavke = stavke;
    }
}