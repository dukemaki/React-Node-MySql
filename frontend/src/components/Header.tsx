import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import '../App.css'
export default function Heder() {
    return (
        <Header className="heder">
            <Link className="veza" to="/">POCETNA</Link>
            <Link className="veza" to="/kupac">KUPCI</Link>
            <Link className="veza" to="/zahtev">ZAHTEVI</Link>
        </Header>
    );
}
