import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Radnik } from './Radnik';
import { Zahtev } from './Zahtev';
 
@Entity()
export class Kupac extends BaseEntity {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    pib: string;
 
    @Column()
    naziv: string;

    @OneToMany(type=>Zahtev, zahtev =>zahtev.kupac)
    zahtevi:Zahtev[];
 
    constructor(id: number, pib: string, naziv: string,zahtevi:Zahtev[]) {
        super();
        this.id = id;
        this.naziv = naziv;
        this.pib = pib;
        this.zahtevi = zahtevi;
    }
 
    
}