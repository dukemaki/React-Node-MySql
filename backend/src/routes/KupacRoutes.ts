import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Kupac } from "../entity/Kupac";

const router = Router();

router.get('/',(req,res)=>{
    getRepository(Kupac).find().then(value=>{
        res.json(value);
    });
});

router.get('/:id',async (req,res)=>{
    let kupac = await getRepository(Kupac).findOne(req.params.id);
    res.json(kupac);
});

router.post('/',(req,res)=>{
    const k = req.body as Kupac;
    if(k.naziv.length<2){
        res.json({
            greska:"Naziv je prekratak"
        })
        return;
    }
    if(k.pib.length<13){
        res.json({
            greska:"PIB MORA IMATI 13 cifara"
        })
        return;
    }
    var reg = new RegExp('^[0-9]*$');
    
    if(!reg.test(k.pib)){
        res.json({
            greska:"PIB MOZE SADRZATI SAMO CIFRE"
        })
        return;
    }
    getRepository(Kupac).insert(req.body).then(value=>{
        res.json({...req.body,id:value.identifiers[0].id})
    })
});

router.patch('/:id',(req,res)=>{
    const k = req.body as Kupac;
    if(k.naziv.length<2){
        res.json({
            greska:"Naziv je prekratak"
        })
        return;
    }
    if(k.pib.length<13){
        res.json({
            greska:"PIB MORA IMATI 13 CIFARA"
        })
        return;
    }
    var reg = new RegExp('^[0-9]*$');
    
    if(!reg.test(k.pib)){
        res.json({
            greska:"PIB MOZE SADRZATI SAMO CIFRE"
        })
        return;
    }
   getRepository(Kupac).update(req.params.id,req.body).then(value=>{
       getRepository(Kupac).findOne(req.params.id).then(value=>{
           res.json(value);
       });
   });
});
router.delete('/:id',(req,res)=>{
    getRepository(Kupac).delete(req.params.id).then(value=>{
        res.send(200);
    });
});

export default router;