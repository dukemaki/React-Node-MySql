import { Router, Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { Zahtev } from "../entity/Zahtev";
import StavkeZahtevaRoutes from "./StavkeZahtevaRoutes";
import { StavkaZahteva } from "../entity/StavkaZahteva";

const router = Router();

router.use('/:zahtev/stavke', StavkeZahtevaRoutes);

router.get('/', (req, res) => {
    getRepository(Zahtev).find().then(value => {
        res.json(value);
    });
});

router.get('/:id', async (req, res) => {
    let zahtev = await getRepository(Zahtev).findOne(req.params.id);
    res.json(zahtev);
});

router.post('/', (req, res) => {
    //let { id, ...zahtev } = req.body as Zahtev;


    let noviZahtev: Zahtev | undefined
    getConnection().transaction(async manager => {
        
        const zahtev = new Zahtev(undefined,req.body.opis,
            req.body.datum,req.body.kupac,req.body.potpisao,req.body.primio,[])
        noviZahtev = await manager.save(zahtev);
        if (req.body.stavke) {
            const stavke = req.body.stavke as StavkaZahteva[];
            stavke.forEach(async element => {
                const st = new StavkaZahteva(undefined, element.naziv, element.kolicina, element.jm, noviZahtev);
                const novaSt = await manager.save(st);
                noviZahtev?.stavke.push(novaSt);
            })
        }
        
    })
    res.json(noviZahtev);

    /* getRepository(Zahtev).insert(zahtev).then(value => {
        id = value.identifiers[0].id;
        let stavke = zahtev.stavke;
        stavke.forEach(element => {
            element.zahtev = new Zahtev(id, zahtev.opis.toString(), zahtev.datum, zahtev.kupac, zahtev.potpisao, zahtev.primio, []);
        })
        return Promise.all((stavke as (StavkaZahteva & { obrisana: boolean })[]).map((element: StavkaZahteva & { obrisana: boolean }) => {
            const { obrisana,id, ...stavka } = element;
            return getRepository(StavkaZahteva).insert(stavka);
        }))
    }).then(value => {
        return getRepository(Zahtev).findOne(id);
    }).then(value => {
        res.json(value);
    }) */
});

router.patch('/:id', (req, res) => {


    let id = parseInt(req.params.id);
    const stariZahtev = req.body as Zahtev;
    const stareStavke = (req.body.stavke as (StavkaZahteva & { obrisana: boolean })[])
        // .filter(element => !element.obrisana)
        .map(element => {
            return new StavkaZahteva(element.id === -1 ? undefined : element.id, element.naziv, element.kolicina, element.jm, stariZahtev);
        })
    getConnection().transaction(async manager => {

        console.log({ zahtevId: id });

        
        const zahtev = new Zahtev(id,stariZahtev.opis.toString(),stariZahtev.datum,
            stariZahtev.kupac,stariZahtev.potpisao,stariZahtev.primio,stareStavke)
        try {
            const noviZahtev = await manager.save(zahtev);
            console.log('snimljeno');
            console.log({ noviId: noviZahtev });
            if (req.body.stavke && (req.body.stavke as StavkaZahteva[]).length > 0) {

                let stavke = req.body.stavke as (StavkaZahteva & { obrisana: boolean })[];
                let stavkeZaBrisanje = stavke.filter(element => element.obrisana && element.id && element.id > 0);
                let stavkeZaSave = stavke.filter(element => !element.obrisana);
                stavkeZaSave.forEach(async element => {
                    const st = new StavkaZahteva(element.id === -1 ? undefined : element.id, element.naziv, element.kolicina, element.jm, zahtev);
                    const novaSt = await manager.save(st);
                    novaSt.setZahtev(undefined);

                })
                console.log('snimljeno');
                stavkeZaBrisanje.forEach(element => {
                    manager.delete(StavkaZahteva, {
                        id: element.id,
                        zahtev: {
                            id: id
                        }
                    })
                })
                console.log('obrisano');
            } else {
                manager.delete(StavkaZahteva, {
                    zahtev: {
                        id: id
                    }
                })
            }
            res.json(noviZahtev);
        } catch (error) {
            console.log(error);
        }
    })

    /* let noviZahtev:Zahtev|undefined;
    let {id,stavke,...zahtev}=req.body;
    getRepository(Zahtev).update(req.params.id, zahtev).then(value => {
        getRepository(Zahtev).findOne(req.params.id).then(value => {
            if(req.body.stavke){
                let stavke=req.body.stavke as (StavkaZahteva &{obrisana:boolean})[];
                let stavkeZaBrisanje=stavke.filter(element=>element.obrisana && element.id && element.id>0);
                let stavkeZaDodavanje=stavke.filter(element=>element.id===-1);
                let stavkeZaIzmenu=stavke.filter(element=> element.id && element.id>0 && !element.obrisana);

                Promise.all(stavkeZaBrisanje.map(element=>{
                    return getRepository(StavkaZahteva).delete({
                        id:element.id,
                        zahtev:{
                            id:parseInt(req.params.id)
                        }
                    });
                })).then(value=>{
                    return Promise.all(stavkeZaDodavanje.map(element=>{
                        const{id,obrisana,...stavka}=element;
                        return getRepository(StavkaZahteva).insert({...stavka,zahtev:{...zahtev,id:parseInt(req.params.id)}});
                    }))
                }).then(value=>{
                    return Promise.all(stavkeZaIzmenu.map(element=>{
                        const{id,obrisana,...stavka}=element;
                    return getRepository(StavkaZahteva).update({
                        id:element.id,
                        zahtev:{
                            id:parseInt(req.params.id)
                        }
                    },stavka)
                    }))
                }).then(value=>{
                   return getRepository(Zahtev).findOne(req.params.id);
                }).then(value=>{
                    noviZahtev=value;
                    if(!value){
                        res.json({greska:'greska'});
                    }else{
                        return getRepository(StavkaZahteva).find({
                            where:{
                                zahtev:{
                                    id:noviZahtev?.id
                                }
                            }
                        })
                    }
                }).then(value=>{
                    if(noviZahtev && value){
                        noviZahtev.stavke=value;
                        res.json(noviZahtev);
                    }
                })
            }
          
        });
    }); */
});

router.delete('/:id', (req, res) => {
    getRepository(Zahtev).delete(req.params.id).then(value => {
        res.send(200);
    });
});

export default router;