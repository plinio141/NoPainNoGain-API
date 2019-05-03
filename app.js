import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import checkTokenMiddleware from './middlewares/checkToken';

mongoose.connect('mongodb+srv://noPainNoGain:noPainNoGain@cluster0-weose.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

//routes import
import users from './routes/users';
import index from './routes/index';
import cities from './routes/cities';
import offices from './routes/offices';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//middleware
app.use(/^\/api\/(?!login.*)(?!register.*)(?!allCities.*)(?!allOffices.*).*/, checkTokenMiddleware.checkToken);

//routes
app.use('/api/', index);
app.use('/api/users', users);
app.use('/api/cities', cities);
app.use('/api/offices', offices);

module.exports = app;
