import express from "express";
import User from "../models/user";
import { verifyAuth, verifyRole } from "../middlewares/authentication";

var router = express.Router();

//Hash password
const bcrypt = require('bcrypt');
const saltRounds =  10;

router.post('/signup', async (req,res) => {
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role
    })
    
    console.log(req.body)
    newUser.password = bcrypt.hashSync(req.body.password, saltRounds);
    try {

        const userDB = await User.create(newUser);

        return res.json(userDB);
        
      } catch (error) {
        const userDB = await User.findOne({email: req.body.email});
        if(userDB) {
            return res.status(400).json({
                mensaje: 'Email already in use',
                error
            });
        } else{
            return res.status(500).json({
              mensaje: 'Ocurrio un error',
              error
            });
        }
      }
});

const _ = require('underscore');
router.put('/user/:id', [verifyAuth, verifyRole], async (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'role', 'password']);
    if (body.password){
        body.password = bcrypt.hashSync(req.body.password, saltRounds)
    }

    try{
        const userDB = await User.findByIdAndUpdate(id,body, {new: true, runValidators: true});
        return res.json(userDB);
    } catch (err) {
        return res.status(400).json({
            message: 'An error ocurred',
            err
        });
    }
})

router.delete('/user/:id', [verifyAuth, verifyRole], async (req,res) => {
    let id = req.params.id;

    try{
        const userDB = await User.findByIdAndRemove(id);

        if (!userDB) {
            return res.status(400).json({
                message: 'User not found',
                err
            });
        }

        return res.json(userDB);
    } catch (err) {
        return res.status(400).json({
            message: 'An error ocurred',
            err
        });
    }
})

module.exports = router;