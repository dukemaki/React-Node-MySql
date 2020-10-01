import React from "react";
import { Button, Container, Modal, Table, Form, Grid, Dropdown, DropdownItemProps } from "semantic-ui-react";
import Zahtev from "../model/Zahtev";
import StavkaZahteva from "../model/StavkaZahteva";
import Kupac from "../model/Kupac";
import Radnik from "../model/Radnik";
import Axios from "axios";

interface Props {
  zahtev?: Zahtev;
  open: boolean;
  close: () => void;
  onSave: (zahtev: Zahtev) => void;
}

function ModalIzmeni(props: Props) {

  const [stavka, setStavka] = React.useState<StavkaZahteva | undefined>(undefined);
  const [stavke, setStavke] = React.useState<StavkaZahteva[]>(props.zahtev ? props.zahtev.getStavke() : []);
  const [datum, setDatum] = React.useState<Date | undefined>(props.zahtev ? props.zahtev.getDatum() : undefined);
  const [opis, setOpis] = React.useState(props.zahtev ? props.zahtev.getOpis() : '');
  const [kupci, setKupci] = React.useState<Kupac[]>([]);
  const [selKupac, setSelKupac] = React.useState<Kupac | undefined>(props.zahtev ? props.zahtev.getKupac() : undefined)
  const [radnici, setRadnici] = React.useState<Radnik[]>([]);
  const [potpisao, setPotpisao] = React.useState<Radnik | undefined>(props.zahtev ? props.zahtev.getPotpisao() : undefined);
  const [primio, setPrimio] = React.useState<Radnik | undefined>(props.zahtev ? props.zahtev.getPrimio() : undefined);
  const [nazivStavke, setNazivStavke] = React.useState('');
  const [kolicinaStavke, setKolicinaStavke] = React.useState<number | undefined>(undefined);
  const [jedinicaMera, setJedinicaMera] = React.useState('');
  const selektuj = (s1: StavkaZahteva) => () => {
    if (stavka?.id === s1.id) {
      setStavka(undefined);
    } else {
      setStavka(s1);
    }
  };

  React.useEffect(() => {
    Axios.get('http://localhost:5000/kupac/').then(value => {
      let kupci = value.data.map(element => {
        return new Kupac(element.id, element.naziv, element.pib);
      });
      setKupci(kupci);
    })
    Axios.get('http://localhost:5000/radnik/').then(value => {
      let rd = (value.data.map(element => {
        return new Radnik(element.id, element.ime);
      }));
      setRadnici(rd);
    })
  }, []);
  React.useEffect(() => {
    setDatum(props.zahtev ? props.zahtev.getDatum() : undefined);
    setOpis(props.zahtev ? props.zahtev.getOpis() : '');
    setSelKupac(props.zahtev ? props.zahtev.getKupac() : undefined);
    setPotpisao(props.zahtev ? props.zahtev.getPotpisao() : undefined);
    setPrimio(props.zahtev ? props.zahtev.getPrimio() : undefined);
    setStavke(props.zahtev ? props.zahtev.getStavke() : []);
  }, [props.zahtev]);
  React.useEffect(() => {
    setNazivStavke(stavka ? stavka.getNaziv() : '');
    setKolicinaStavke(stavka ? stavka.getKolicina() : 0);
    setJedinicaMera(stavka ? stavka.getJedinicaMere() : '')
  }, [stavka])
  return (
    <Modal size='large' open={props.open} onClose={props.close}>
      <Modal.Header>Zahtev</Modal.Header>
      <Modal.Content>


        <Grid columns='16'>
          <Grid.Row>
            <Grid.Column width='3'>
              <Form>
                <Form.Input
                  type='date'
                  label='Datum'
                  value={datum && datum.toISOString().substr(0, 10)}
                  onChange={(e) => {
                    setDatum(new Date(e.target.value));
                  }}
                //onChange
                />
                <Form.Input
                  label="Opis"
                  placeholder="Opis"
                  value={opis}
                  onChange={(e) => {
                    e.preventDefault();
                    setOpis(e.target.value)
                  }}
                />
                <Dropdown
                  selection
                  labeled
                  placeholder='Kupac'
                  value={selKupac && selKupac.getId()}
                  options={kupci.map((element, index): DropdownItemProps => {
                    return {
                      value: element.getId(),
                      text: element.getNaziv(),
                      onClick: () => {
                        setSelKupac(element);
                      }
                    }
                  })}
                />
                <Dropdown
                  selection
                  value={primio && primio.getId()}
                  placeholder='Primio'
                  options={radnici.map((element, index): DropdownItemProps => {
                    return {
                      value: element.getId(),
                      text: element.getImePrezime(),
                      onClick: () => {
                        setPrimio(element);
                      }
                    }
                  })}
                />
                <Dropdown
                  selection
                  placeholder='Potpisao'
                  value={potpisao && potpisao.getId()}
                  options={radnici.map((element, index): DropdownItemProps => {
                    return {
                      value: element.getId(),
                      text: element.getImePrezime(),
                      onClick: () => {
                        setPotpisao(element);
                      }
                    }
                  })}
                />

              </Form>
            </Grid.Column>
            <Grid.Column width='7' >
              <Table columns="4" celled>
                <Table.Header>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Naziv</Table.HeaderCell>
                  <Table.HeaderCell>Kolicina</Table.HeaderCell>
                  <Table.HeaderCell>Jedinica mere</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {stavke.filter(element => !element.obrisana).map((element, index) => {
                    console.log(element);
                    return (<Table.Row key={index} active={element === stavka} onClick={() => {
                      if (element === stavka) {
                        setStavka(undefined)
                      } else {
                        setStavka(element)
                      }
                    }}>
                      <Table.Cell>{element.getId()}</Table.Cell>
                      <Table.Cell>{element.getNaziv()}</Table.Cell>
                      <Table.Cell>{element.getKolicina()}</Table.Cell>
                      <Table.Cell>{element.getJedinicaMere()}</Table.Cell>
                    </Table.Row>)
                  })}
                </Table.Body>
              </Table>




            </Grid.Column>
            {<Grid.Column width='6'>
              <Form size='small' inline>
                <Form.Input
                  label='naziv'
                  placeholder='naziv'
                  value={nazivStavke}
                  onChange={(e) => {
                    setNazivStavke(e.target.value)
                  }}
                />
                <Form.Input
                  label='kolicina'
                  placeholder='kolicina'
                  type='number'
                  value={kolicinaStavke}
                  onChange={(e) => {
                    setKolicinaStavke(parseInt(e.target.value))
                  }}
                />
                <Form.Input
                  label='jed. mere'
                  placeholder='jed. mere'
                  value={jedinicaMera}
                  onChange={(e) => {
                    setJedinicaMera(e.target.value)
                  }}
                />
                <Button size='tiny' onClick={(e) => {
                  e.preventDefault();
                  const novaStavka = new StavkaZahteva(-1, nazivStavke, kolicinaStavke, jedinicaMera);
                  setStavke([...stavke, novaStavka]);
                  setNazivStavke('');
                  setKolicinaStavke(undefined);
                  setJedinicaMera('')
                }}>Dodaj stavku</Button>
                <Button size='tiny' disabled={!stavka} onClick={(e) => {
                  e.preventDefault();
                  let noveStavke = [...stavke];
                  let index = noveStavke.findIndex(element => element === stavka);
                  setStavka(prev => {
                    let nova = new StavkaZahteva(prev!.getId(), nazivStavke, kolicinaStavke, jedinicaMera)
                    noveStavke[index] = nova;
                    console.log(noveStavke);
                    setStavke(noveStavke);
                    return nova;
                  });


                }} >Izmeni stavku</Button>
                <Button size='tiny' disabled={!stavka} onClick={(e) => {
                  e.preventDefault();
                  if (stavka.getId() == -1) {
                    setStavke(stavke.filter(element => element !== stavka));
                  } else {
                    setStavke(stavke.map(element => {
                      if (element === stavka) {
                        const el1 = new StavkaZahteva(element.getId(), element.getNaziv(), element.getKolicina(), element.getJedinicaMere());
                        el1.obrisana = true;
                        return el1;
                      }
                      return element;
                    }))
                  }
                  setStavka(undefined);

                }}>Obrisi stavku</Button>
              </Form>
            </Grid.Column>}
          </Grid.Row>
          <Grid.Row stretched>
            <Button floated='right' onClick={(e) => {
              if(datum===undefined || selKupac===undefined || potpisao===undefined || primio===undefined){
                alert("POPUNITE SVA POLJA")
                return;
              }
              
              props.onSave(new Zahtev(props.zahtev ? props.zahtev.getId() : -1, datum, opis, selKupac, potpisao, primio, stavke));
              props.close()
            }}>Sacuvaj</Button>
          </Grid.Row>
        </Grid>



      </Modal.Content>
    </Modal>
  );
}

export default ModalIzmeni;
