import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { StavkaZahteva } from "../entity/StavkaZahteva";

const router = Router();

router.get('/',(req,res)=>{
    getRepository(StavkaZahteva).find().then(value=>{
        res.json(value);
    });
});

router.get('/:id',async (req,res)=>{
    let kupac = await getRepository(StavkaZahteva).findOne(req.params.id);
    res.json(kupac);
});

router.post('/',(req,res)=>{
    getRepository(StavkaZahteva).insert(req.body).then(value=>{
        res.json({...req.body,id:value.identifiers[0].id})
    })
});

router.patch('/:id',(req,res)=>{
   getRepository(StavkaZahteva).update(req.params.id,req.body).then(value=>{
       getRepository(StavkaZahteva).findOne(req.params.id).then(value=>{
           res.json(value);
       });
   });
});
router.delete('/:id',(req,res)=>{
    getRepository(StavkaZahteva).delete(req.params.id).then(value=>{
        res.send(200);
    });
});


export default router;