
import 'reflect-metadata';

import express from 'express';
import {createConnection} from 'typeorm';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import kupacRouter from './routes/KupacRoutes';
import zahtevRouter from './routes/ZahtevRoutes';
import radnikRouter from './routes/RadnikRoutes';
console.log('pre');
createConnection().then(connection=>{
    
    console.log('then');
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());
    app.use('/radnik',radnikRouter);
    app.use('/kupac',kupacRouter);
    app.use('/zahtev',zahtevRouter);
   

    app.listen(process.env.PORT || 5000,()=>console.log('Server je pokrenut na portu 3000!'));
});