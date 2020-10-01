import React, { useState } from 'react';
import { Grid, Table, TableBody, Button, Modal } from 'semantic-ui-react';
import Zahtev from '../model/Zahtev';
import StavkaZahteva from '../model/StavkaZahteva';
import ModalIzmena from "./ModalIzmena";
import ModalIzmeni from './ModalIzmeni';

interface Props {
    zahtevi: Zahtev[];
    zahtev?: Zahtev;
    setSelektovaniZahtev: (zahtev?: Zahtev) => void;
    obrisi: () => void;
    stavke: StavkaZahteva[] | undefined;
    onSave: (zahtev: Zahtev) => void;
    onUpdate: (zahtev: Zahtev) => void;
}

export default function TabelaZahtev(props: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInsert, setIsInsert] = useState(true);
    const otvori = () => {
        setIsModalOpen(true);
    }
    const zatvori = () => {
        setIsModalOpen(false);
    }
    const { } = props;

    const selektuj = (z1: Zahtev) => () => {
        if (props.zahtev === z1) {
            props.setSelektovaniZahtev(undefined);
        } else {
            props.setSelektovaniZahtev(z1);
        }
    };

    return (
        <Grid.Column width='14'>
            <Table size='large' columns='3' celled >
                <Table.Header>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>DATUM</Table.HeaderCell>
                    <Table.HeaderCell>KUPAC</Table.HeaderCell>
                    <Table.HeaderCell>PRIMIO</Table.HeaderCell>
                    <Table.HeaderCell>POTPISAO</Table.HeaderCell>
                    <Table.HeaderCell>OPIS</Table.HeaderCell>
                </Table.Header>
                <TableBody>
                    {props.zahtevi.map((z1) => {
                        return (
                            <Table.Row active={props.zahtev === z1} onClick={selektuj(z1)}>
                                <Table.Cell>{z1.id}</Table.Cell>
                                <Table.Cell>{z1.getDatum()?.toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{z1.kupac.naziv}</Table.Cell>
                                <Table.Cell>{z1.potpisao.imePrezime}</Table.Cell>
                                <Table.Cell>{z1.primio.imePrezime}</Table.Cell>
                                <Table.Cell>{z1.opis}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </TableBody>
            </Table>

            <Button disabled={props.zahtev === undefined} onClick={(e) => {
                e.preventDefault();
                props.obrisi();
            }}>Obrisi</Button>
            <Button disabled={props.zahtev === undefined} onClick={(e) => {
                e.preventDefault();
                setIsInsert(false);
                otvori();
            }}>Izmeni</Button>
            <Button onClick={(e) => {
                e.preventDefault();
                Promise.resolve(props.setSelektovaniZahtev(undefined)).then(() => {
                    setIsInsert(true);
                    otvori();
                })

            }}>Dodaj</Button>
            <ModalIzmeni onSave={isInsert ? props.onSave : props.onUpdate} open={isModalOpen} close={zatvori} zahtev={props.zahtev} />


        </Grid.Column>

    );
}