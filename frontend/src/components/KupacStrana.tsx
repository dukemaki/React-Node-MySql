import React from 'react';
import { Grid } from 'semantic-ui-react'
import TabelaKupac from './TabelaKupac';
import FormaKupac from './FormaKupac';
import Kupac from '../model/Kupac';
import axios from 'axios';
export default function KupacStrana() {
    const [kupci, setKupci] = React.useState<Kupac[]>([]);
    const [selKupac, setKupac] = React.useState<Kupac | undefined>(undefined);

    const dodajKupca = (naziv: string, pib: string) => {
        axios.post('http://localhost:5000/kupac', {
            naziv: naziv,
            pib: pib
        }).then(value => {
            if(value.data.greska){
                alert(value.data.greska)
                return
            }
            setKupci([...kupci, (value.data as Kupac)])
            setKupac(undefined);
        })
    }
    const izmeniKupca = (naziv: string, pib: string) => {
        axios.patch('http://localhost:5000/kupac/' + selKupac!.id, {
            naziv: naziv,
            pib: pib
        }).then(value => {
            if(value.data.greska){
                alert(value.data.greska)
                return
            }
            let noviNiz = [...kupci];
            let index = noviNiz.findIndex((k1) => k1.id === value.data.id);
            if (index === -1) {
                return;
            }
            noviNiz[index] = value.data as Kupac;
            setKupci(noviNiz);
            setKupac(undefined);
        })
    }
    const obrisiKupca = () => {
        axios.delete('http://localhost:5000/kupac/' + selKupac!.id).then(value => {
            setKupci(kupci.filter((k1) => k1.id !== selKupac!.id));
            setKupac(undefined);
        })
    }
    React.useEffect(() => {
        axios.get('http://localhost:5000/kupac').then(value => {
            const k1 = (value.data as Kupac[]);
            setKupci(k1);
        })
    }, [])
    return (
        <Grid >
            <Grid.Row className="tabelaKupac">
                <TabelaKupac kupci={kupci} kupac={selKupac} setSelektovaniKupac={setKupac} />
            </Grid.Row>
            <Grid.Row className="formaKupac">
                <FormaKupac kupac={selKupac} dodaj={dodajKupca} izmeni={izmeniKupca} obrisi={obrisiKupca} />
            </Grid.Row>
        </Grid>
    );
}
