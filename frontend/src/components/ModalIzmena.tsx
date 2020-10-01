import React from "react";
import {  Modal,Button,Header,Label,Input,Container,Table,} from "semantic-ui-react";
import StavkaZahteva from "../model/StavkaZahteva";
import Zahtev from "../model/Zahtev";

interface Props {
  zahtev?:Zahtev;
  open:boolean;
  close:()=>void;
}

function ModalIzmena(props: Props) {

  const[stavka,setStavka]=React.useState<StavkaZahteva|undefined>(undefined);
  let [datum, setDatum] = React.useState<Date|undefined>(undefined)
  let [kupac, setKupac] = React.useState("");
  let [primio, setPrimio] = React.useState("");
  let [potpisao, setPotpisao] = React.useState("");
  let [opis, setOpis] = React.useState("");

  const selektuj = (s1: StavkaZahteva) => () => {
    if (stavka === s1) {
     setStavka(undefined);
    } else {
      setStavka(s1);
    }
  };

  React.useEffect(() => {
    if (props.zahtev) {
      setDatum(props.zahtev.datum);
      setKupac(props.zahtev.kupac.naziv);
      setOpis(props.zahtev.opis);
      setPotpisao(props.zahtev.potpisao.imePrezime);
      setPrimio(props.zahtev.primio.imePrezime);
    }
    else{
      setDatum(undefined);
      setKupac('');
      setOpis('');
      setPotpisao('');
      setPrimio('');
    }
  }, [props.zahtev]);

  return (
    <Modal 
    className="modal" 
    open={props.open} 
    onClose={props.close}  /*trigger={<Button  disabled={props.upit === undefined}>Izmeni</Button>}*/>
      <Modal.Header>Upit</Modal.Header>
      <Modal.Content>
        
        {/* <Input className="prvi"
        label="Datum"
        placeholder="Datum"
        value={datum}
        onChange={(e) => {
          e.preventDefault();
          setDatum(e.target.value);
        }}
      /> */}
        <p></p> 
        <Input className="drugi"
        label="Kupac"
        placeholder="Kupac"
        value={kupac}
        onChange={(e) => {
          e.preventDefault();
          setKupac(e.target.value);
        }}
      />
        <p></p>
        <Input className="treci"
        label="Potpisao"
        placeholder="Potpisao"
        value={potpisao}
        onChange={(e) => {
          e.preventDefault();
          setPotpisao(e.target.value);
        }}
        />
        <p></p>
        <Input className="cetvrti"
        label="Primio"
        placeholder="Primio"
        value={primio}
        onChange={(e) => {
          e.preventDefault();
          setPrimio(e.target.value);
        }}
        />
        <p></p>
        <Input className="peti"
        label="Opis"
        placeholder="Opis "
        value={opis}
        onChange={(e) => {
          e.preventDefault();
          setOpis(e.target.value);
        }}
        ></Input>
        <p></p>
    
        <Container className="kontejner">
          <Table className="tabela" columns="4" celled>
            <Table.Header>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Naziv</Table.HeaderCell>
              <Table.HeaderCell>Kolicina</Table.HeaderCell>
              <Table.HeaderCell>Jedinica mere</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
            {props.zahtev?.stavke.map((s1) => {
            return (
              <Table.Row active={s1 === stavka} onClick={selektuj(s1)}>
                <Table.Cell>{s1.id}</Table.Cell>
                <Table.Cell>{s1.naziv}</Table.Cell>
                <Table.Cell>{s1.kolicina}</Table.Cell>
                <Table.Cell>{s1.jm}</Table.Cell>
               
              </Table.Row>
            );
          })}
            </Table.Body>
          </Table>
          <div className="stavkeDugmad"> 
            <Button>Dodaj stavku</Button>
            <Button>Izmeni stavku</Button>
            <Button>Obrisi stavku</Button>
          </div>
        </Container>
      </Modal.Content>
    </Modal>
  );
}

export default ModalIzmena;
