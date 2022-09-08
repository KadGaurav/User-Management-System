const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080 ;

//log requests
app.use(morgan('tiny'));

//connect to MongoDB
connectDB();

//parse request to body-parser
app.use(express.urlencoded({ extended: true }))

app.set('view engine','ejs');

//Load Assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));


//Load Routes
app.use('/',require('./server/routes/router'));


app.listen(PORT , ()=>{
    console.log(`Server Running on port http://localhost:${PORT}/`);
})