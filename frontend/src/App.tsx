import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import KupacStrana from './components/KupacStrana'
import ZahtevStrana from './components/ZahtevStrana'
function App() {




  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <h1>DOBRODOSLI</h1>
          <h2>APLIKACIJA ZA UNOS KUPACA I NJIHOVIH ZAHTEVA</h2>
        </Route>
        <Route path="/kupac" >
          <KupacStrana />
        </Route>
        <Route path="/zahtev" >
          <ZahtevStrana />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
