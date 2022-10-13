import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const router = express.Router();
const saltRounds = 10;

router.get('/login', async (req, res) => {
    res.json({
        message: 'It works!'
    });
});

router.post('/login', async (req, res) => {
    let body = req.body;

    try{
        //Search email
        const userDB = await User.findOne({email: body.email});

        //check if user exist
        if (!userDB) {
            return res.status(404).send({
                message: 'user not found'
            })
        }
        //check if the password is ok
        if (!await bcrypt.compare(body.password, userDB.password)) {
            return res.status(404).send({
                message: 'invalid password'
            })
        }

        // Create Token
        let token = jwt.sign({
            data: userDB
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30}) // Expire in 30 days
        
        // Validations
        return res.json({
            userDB,
            token: token
        })
    } catch (err) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          err
        });
      }
});

module.exports = router;