import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, BaseEntity, OneToMany } from 'typeorm';
import { Kupac } from './Kupac';
import { Radnik } from './Radnik';
import { StavkaZahteva } from './StavkaZahteva';

@Entity()
export class Zahtev extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    opis: String;

    @Column()
    datum: Date;

    @ManyToOne(type => Kupac, kupac => kupac.zahtevi, { eager: true })
    kupac: Kupac;

    @ManyToOne(type => Radnik, potpisao => potpisao.potpisao, { eager: true })
    potpisao: Radnik;

    @ManyToOne(type => Radnik, primio => primio.primio, { eager: true })
    primio: Radnik;

    @OneToMany(type => StavkaZahteva, zahtev => zahtev.zahtev, { eager: true, onDelete: 'CASCADE' })
    stavke: StavkaZahteva[];

    constructor(id: number|undefined, opis: string, datum: Date, kupac: Kupac, potpisao: Radnik, primio: Radnik, stavke: StavkaZahteva[]) {
        super();
        this.id = id;
        this.opis = opis;
        this.datum = datum;
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

    public getOpis() {
        return this.opis;
    }

    public setOpis(opis: string) {
        this.opis = opis;
    }

    

}