import express from "express";
import Note from "../models/note"
const router = express.Router();

router.post('/new-note', async (req,res) => {
    const body = req.body;

    try{
        const noteDB = await Note.create(body);
        res.status(200).json(noteDB);
    } catch (err) {
        return res.status(400).json({
            message: 'An error ocurred',
            err
        })
    }
});

router.get('/note/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const noteDB = await Note.findOne({_id});
        res.json(noteDB);
    } catch (err) {
        return res.status(400).json({
            message: 'An error ocurred',
            err
        })
    }
});

router.get('/notes', async (req,res) => {
    try{ 
        const noteDB = await Note.find();
        res.json(noteDB);
    } catch (err) {
        return res.status(400).json({
            message: 'An error ocurred',
            err
        })
    }
});

router.delete('/note/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const noteDB = await Note.findByIdAndDelete({_id});
        if(!noteDB){
            return res.status(400).json({
                message: 'Id not found',
                err
            })
        }
        res.json(noteDB)
    } catch (err) {
        return res.status(400).json({
            message: 'An error ocurred',
            err
        })
    }
});

router.put('/note/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try{
        const noteDB = await Note.findByIdAndUpdate(_id, body, {new: true});
        res.json(noteDB)
    } catch (err) {
        return res.status(400).json({
            message: 'An error ocurred',
            err
        })
    }
});

module.exports = router;
