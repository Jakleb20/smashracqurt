import express, { Request, Response} from  "express";
import {mockUsers} from "../mockdata/mockUsers";
import {UserModel} from "../src/db/UserModel";

let router = express.Router();

router.get('/', (req: Request, res:Response)=> {
    UserModel.find().then(users => res.send(users));
});

router.get('/:id', (req: Request, res:Response)=> {
    UserModel.findById(req.params.id).then(user => res.send(user));
});

router.post('/', (req: Request, res:Response)=> {
    const user = new UserModel(req.body);
    user.save().then(user => res.send(user));
});

router.put('/:id', (req: Request, res:Response)=> {
    UserModel.findByIdAndUpdate(req .params.id, req.body).then(() => res.sendStatus(200));
});

router.delete('/:id', (req: Request, res:Response)=> {
    UserModel.findByIdAndDelete(req.params.id).then(() => res.sendStatus(200));
});

router.delete('/', (req: Request, res:Response)=> {
    UserModel.deleteMany().then(() => res.sendStatus(200));
});

module .exports = router;