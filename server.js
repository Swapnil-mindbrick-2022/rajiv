const  express = require('express');
const  env = require('dotenv').config()
const  ejs = require('ejs');
const  path = require('path');
const  app = express();
const Users = require('./models/user')
const  bodyParser = require('body-parser');
const  mongoose = require('mongoose');
const  session = require('express-session');
// const quizRoute = require('./routes/quiz')
// const  MongoStore = require('connect-mongo')(session);  
// const fileUpload = require('express-fileupload'
global.__basedir = __dirname + "/..";

const DB = "mongodb+srv://shu810:shu810@cluster0.uub44.mongodb.net/registration?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

// require('./routes/userroute')
// require('./routes/admin')(app)
// require('./routes/index')(app)
// require('./routes/project')(app)
app.get('/',(req,res)=>{
    res.render('registration')
})

app.post('/register',(req,res)=>{
    const {name,age,mobilenumber,district,area,interested,} = req.body

    Users.findOne({Mobileno:mobilenumber}).then((data)=>{
        if (data){
            res.send('Your Response has already been taken..')
        }else{
            const newUser = new Users({
                Name:name,
                District:district,
                Area:area,
                Age:age,
                Mobileno:mobilenumber,
                interested:interested,
            })
            newUser.save().then((data)=>{
                if (data){
                    console.log(data)
                    // res.send(data)
                    return res.render('response')
                }
            }).catch(err=> res.send(err))
        }
    }).catch(err=> res.send(err))


    







})

app.use(function (req, res, next) {
  const  err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});



