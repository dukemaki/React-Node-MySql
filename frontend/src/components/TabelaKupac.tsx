import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import Kupac from '../model/Kupac';

interface Props {
    kupci: Kupac[],
    kupac?: Kupac,
    setSelektovaniKupac: (kupac?: Kupac) => void,
}
export default function TabelaKupac(props: Props) {

    const selektuj = (kupac: Kupac) => () => {
        if (props.kupac === kupac) {
            props.setSelektovaniKupac(undefined);
        } else {
            props.setSelektovaniKupac(kupac);
        }
    }

    return (
        <Grid.Column width='15'>
            <Table size='large' columns='3' celled >
                <Table.Header>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Naziv</Table.HeaderCell>
                    <Table.HeaderCell>PIB</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {
                        props.kupci.map((k1) => {
                            return (
                                <Table.Row active={k1 === props.kupac} onClick={selektuj(k1)} >
                                    <Table.Cell>
                                        {k1.id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {k1.naziv}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {k1.pib}
                                    </Table.Cell>
                                </Table.Row>

                            )
                        })
                    }
                </Table.Body>
            </Table>


        </Grid.Column>

    );
}
