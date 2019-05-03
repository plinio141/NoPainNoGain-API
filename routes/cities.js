import express from 'express';
import cityModel from './../models/city';
import mapErrorsLib from './../lib/mapErrors';

const router = express.Router();

router.post('/new', async (req, res)=>{
    console.log(req.body);
    
    let city = new cityModel(req.body);
    try {
        await city.save();
    } catch (error) {
        let errors = mapErrorsLib.mapErrors(error);
        return res.send({
            success: false,
            errors,
            message: 'city not saved!'
        });
    }
    return res.send({
        success: true,
        message: 'city saved!'
    });
});

module.exports = router;
