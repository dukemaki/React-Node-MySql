import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Radnik } from "../entity/Radnik";

const router = Router();

router.get('/',(req,res)=>{
    getRepository(Radnik).find().then(value=>{
        res.json(value);
    });
});

export default router;