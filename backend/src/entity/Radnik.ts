import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Zahtev } from './Zahtev';
 
@Entity()
export class Radnik extends BaseEntity {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    ime: string;

    @OneToMany(type=>Zahtev, zahtev =>zahtev.potpisao)
    potpisao:Zahtev[];
    
    @OneToMany(type=>Zahtev, zahtev =>zahtev.potpisao)
    primio:Zahtev[];

    constructor(id: number, ime: string,zahtevi:Zahtev[],primio:Zahtev[]) {
        super();
        this.id = id;
        this.ime = ime;
        this.potpisao = zahtevi;
        this.primio = primio;
    }
}