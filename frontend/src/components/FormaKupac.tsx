import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Kupac from '../model/Kupac';

interface Props {
    kupac: Kupac | undefined,
    dodaj: (naziv: string, pib: string) => void,
    izmeni: (naziv: string, pib: string) => void,
    obrisi: () => void,
}
export default function FormaKupac(props: Props) {

    let [naziv, setNaziv] = React.useState('');
    let [pib, setPib] = React.useState('');

    React.useEffect(() => {
        if (props.kupac) {
            setNaziv(props.kupac.naziv);
            setPib(props.kupac.pib);
        } else {
            setNaziv('');
            setPib('');
        }
    }, [props.kupac])
    return (
        <Form className="forma" size='big'>
            <Form.Input

                label='Naziv'
                placeholder='Naziv'
                value={naziv}
                onChange={(e) => {
                    e.preventDefault();
                    setNaziv(e.target.value);
                }}

            />  <Form.Input
                label='PIB'
                placeholder='PIB'
                value={pib}
                onChange={(e) => {
                    e.preventDefault();
                    setPib(e.target.value);
                }}
            />
            <Button onClick={(e) => {
                e.preventDefault();
                props.dodaj(naziv, pib);
               setNaziv('');
                setPib('');
            }} >
                Dodaj
            </Button>
            <Button disabled={props.kupac === undefined} onClick={(e) => {
                e.preventDefault();
                props.izmeni(naziv, pib);
            }}>
                Izmeni
            </Button>
            <Button disabled={!props.kupac} onClick={(e) => {
                e.preventDefault();
                props.obrisi();
            }}>
                Obrisi
            </Button>
        </Form>
    );
}
