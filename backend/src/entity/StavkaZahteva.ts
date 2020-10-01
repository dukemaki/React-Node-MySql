import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Zahtev } from './Zahtev';

@Entity()
export class StavkaZahteva extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    naziv: string;

    @Column()
    kolicina: number;

    @Column()
    jm: string;

    @ManyToOne(type => Zahtev, { eager: false, primary: true })
    zahtev?: Zahtev;

    constructor(id: number|undefined, naziv: string, kolicina: number, jm: string, zahtev: Zahtev|undefined) {
        super();
        this.id = id;
        this.naziv = naziv;
        this.kolicina = kolicina;
        this.jm = jm;
        this.zahtev = zahtev;
    }
    public getZahtev() {
        return this.zahtev;
    }

    public setZahtev(zahtev: Zahtev|undefined) {
        this.zahtev = zahtev;
    }
}