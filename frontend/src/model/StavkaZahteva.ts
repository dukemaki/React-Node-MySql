
export default class StavkaZahteva {
    id: number;
    naziv: string;
    kolicina: number;
    jm: string;
    obrisana: boolean;
    constructor(id: number, naziv: string, kolicina: number, jm: string) {
        this.id = id;
        this.naziv = naziv;
        this.kolicina = kolicina;
        this.jm = jm;
        this.obrisana = false;
    }

    public getId() {

        return this.id;
    }

    public setId(id: number) {

        this.id = id;

    }


    public getNaziv() {

        return this.naziv;
    }

    public setNaziv(naziv: string) {

        this.naziv = naziv;

    }

    public getKolicina() {

        return this.kolicina;
    }

    public setKolicina(kolicina: number) {

        this.kolicina = kolicina;

    }


    public getJedinicaMere() {

        return this.jm;
    }

    public setJedinicaMere(jedinicaMere: string) {

        this.jm = jedinicaMere;

    }
}