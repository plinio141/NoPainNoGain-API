import express from 'express';
import jwt from 'jsonwebtoken';
import config from './../config/config';
import userModel from './../models/user';
import officeModel from './../models/office';
import mapErrorsLib from './../lib/mapErrors'

const router = express.Router();

router.get('/', (req, res)=>{

});

router.post('/login', async (req, res)=>{
    let { email, password } = req.body;
    let user = await userModel.findOne({email});
    if(user){        
        let valid = await user.validPassword(password)
        if(valid){
            let token = jwt.sign({user},
                config.secret,
                { expiresIn: '24h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            res.send({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        }else{
            res.json({
                success: false,
                message: 'error_username_password'
            });
        }
    }else{
        res.json({
            success: false,
            message: 'error_username_password'
        });
    }
});

router.post('/register', async (req, res) =>  {
    let office = await officeModel.findOne({code: req.body.office});
      if(!!!office){
          return res.send({
              success: false,
              errors: [{propertie:'office', message: 'office_not_exist'}],
              message: 'office not exist!'
          });
      }
    req.body.office = office._id;
  
    let numUsers = await officeModel.count({office: office._id});
    if(numUsers === 300) {
      return res.send({
        success: false,
        errors: [{propertie:'quota', message: 'office_not_quota'}],
        message: 'the office does not quota!'
      });
    }
    let user = new userModel(req.body);
    try {
      await user.save();
    } catch (error) {
        let errors = mapErrorsLib.mapErrors(error);
      return res.send({
        success: false,
        errors,
        message: 'user not saved!'
      });
    }
    res.send({
      success: true,
      message: 'user saved successful!'
    });
  });

module.exports = router;