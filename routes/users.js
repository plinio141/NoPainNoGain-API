import express from 'express';
import userModel from './../models/user';
import officeModel from './../models/office';
import cityModel from './../models/city';

var router = express.Router();

/*router.post('/new', async (req, res) =>  {
  let office = await officeModel.findOnde({code: req.body.office});
    if(!!!office){
        return res.send({
            success: false,
            errors: [{propertie:'office', message: 'office_not_exist'}],
            message: 'office not exist!'
        });
    }
  req.body.office = office._id;

  let numUsers = await officeModel.countDocuments({office: office._id});
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
    return res.send({
      success: false,
      message: 'user not saved!'
    });
  }
  res.send({
    success: true,
    message: 'user saved successful!'
  });
});*/

router.get('/search', async (req, res) =>  {
  let city = await cityModel.findOne({code: req.query.codeCity});
  if(!!!city){
    return res.send({
      success: false,
      errors: [{propertie:'codeCity', message: 'city_not_exist'}],
      message: 'city not exist!'
    });
  }

  let office = await officeModel.findOne({city:city._id, code: req.query.codeOffice});
  if(!!!office){
      return res.send({
          success: false,
          errors: [{propertie:'codeOffice', message: 'office_not_exist'}],
          message: 'office not exist!'
      });
  }

  let clients = await userModel.find({office:office._id}).lean();

  return res.send({success: true, clients});

});


module.exports = router;
