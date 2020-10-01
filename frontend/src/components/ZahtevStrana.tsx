
import React from 'react';
import { Grid } from 'semantic-ui-react';
import TabelaZahtev from './TabelaZahtev';
import Zahtev from '../model/Zahtev';
import axios from 'axios';
import Kupac from '../model/Kupac';
import Radnik from '../model/Radnik';
import StavkaZahteva from '../model/StavkaZahteva';

export default function ZahtevStrana() {

  const [zahtevi, setZahtevi] = React.useState<Zahtev[]>([]);
  const [selZahtev, setZahtev] = React.useState<Zahtev | undefined>(undefined);

  const osvezi =  function refreshPage() {
    window.location.reload(false);
  }
  const obrisiZahtev = () => {

    axios.delete('http://localhost:5000/zahtev/' + selZahtev!.id).then(value => {

      setZahtevi(zahtevi.filter((b1) => b1.id !== selZahtev!.id))
      setZahtev(undefined);

    })

  }
  const dodajZahtev = (zahtev: Zahtev) => {
    console.log('insert');
    axios.post('http://localhost:5000/zahtev/', zahtev).then(value => {
      setZahtevi([...zahtevi, napraviZahtev(value.data)]);
    })
    osvezi()
  }
  const napraviZahtev = (element: any): Zahtev => {
    console.log({element:element});
    let stavkeUpita = element.stavke.map((stavka?) => {
      console.log(stavka);
      return new StavkaZahteva(stavka.id, stavka.naziv, stavka.kolicina, stavka.jm)
    }) as StavkaZahteva[];
    const z1: Zahtev = new Zahtev(element.id, new Date(element.datum), element.opis,
      (new Kupac(element.kupac.id, element.kupac.naziv, element.kupac.pib)),
      (new Radnik(element.potpisao.id, element.potpisao.ime)),
      (new Radnik(element.primio.id, element.primio.ime)),
      stavkeUpita)
    console.log({ z1: z1 });
    return z1;
  }

  const azurirajZahtev = (zahtev: Zahtev) => {
    console.log('update');
    console.log({zahtev:zahtev})
    axios.patch(`http://localhost:5000/zahtev/` + zahtev.getId(), zahtev).then(value => {
      console.log('azurirano')
      osvezi()
      setZahtevi(zahtevi.map(element => {
        if (element.getId() !== value.data.id) {
          return element;
        } else {
          return napraviZahtev(value.data);
        }
      }))
    }).catch(err => console.log({ greska: err }))
  }

  React.useEffect(() => {

    axios.get('http://localhost:5000/zahtev').then(value => {
      console.log('afsgrh');
      console.log({rezultat:value.data});
      const z1 = value.data.map((element) => {
        const stavkeZahteva = element.stavke.map((stavka) => {

          return new StavkaZahteva(stavka.id, stavka.naziv, stavka.kolicina, stavka.jm)
        })
        return new Zahtev(element.id, new Date(element.datum), element.opis,
          (new Kupac(element.kupac.id, element.kupac.naziv, element.kupac.pib)),
          (new Radnik(element.potpisao.id, element.potpisao.ime)),
          (new Radnik(element.primio.id, element.primio.ime)),
          stavkeZahteva
        )
      })
      setZahtevi(z1);
      
    })

  }, []);

  return (
    <Grid >
      <Grid.Row className = "tabelaZahtev">
        <TabelaZahtev
          onSave={dodajZahtev}
          onUpdate={azurirajZahtev}
          obrisi={obrisiZahtev}
          zahtevi={zahtevi}
          setSelektovaniZahtev={setZahtev}
          zahtev={selZahtev}
          stavke={selZahtev?.stavke} />
      </Grid.Row>
    </Grid>
  );
}
