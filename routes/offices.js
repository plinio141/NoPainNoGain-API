import express from 'express';
import cityModel from './../models/city';
import officeModel from './../models/office';
import mapErrorsLib from './../lib/mapErrors';

const router = express.Router();

router.post('/new', async (req, res)=>{
    console.log(req.body);
    let city = await cityModel.findOne({code: req.body.city});
    if(!!!city){
        return res.send({
            success: false,
            errors: [{propertie:'city', message: 'city_not_exist'}],
            message: 'city not exist!'
        });
    }
    req.body.city = city._id;

    let office = new officeModel(req.body);
    try {
        await office.save();
    } catch (error) {
        let errors = mapErrorsLib.mapErrors(error);
        return res.send({
            success: false,
            errors,
            message: 'office not saved!'
        });
    }
    return res.send({
        success: true,
        message: 'office  saved!'
    });
});

module.exports = router;
