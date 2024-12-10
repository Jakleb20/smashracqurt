"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserModel_1 = require("../src/db/UserModel");
let router = express_1.default.Router();
router.get('/', (req, res) => {
    UserModel_1.UserModel.find().then(users => res.send(users));
});
router.get('/:id', (req, res) => {
    UserModel_1.UserModel.findById(req.params.id).then(user => res.send(user));
});
router.post('/', (req, res) => {
    const user = new UserModel_1.UserModel(req.body);
    user.save().then(user => res.send(user));
});
router.put('/:id', (req, res) => {
    UserModel_1.UserModel.findByIdAndUpdate(req.params.id, req.body).then(() => res.sendStatus(200));
});
router.delete('/:id', (req, res) => {
    UserModel_1.UserModel.findByIdAndDelete(req.params.id).then(() => res.sendStatus(200));
});
router.delete('/', (req, res) => {
    UserModel_1.UserModel.deleteMany().then(() => res.sendStatus(200));
});
module.exports = router;
