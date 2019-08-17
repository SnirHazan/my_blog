import express from 'express';
import bodyParser from 'body-parser';
import articleRoute from './routes/articleRoute';
import path from 'path';


//Create app and add ability to read json object using body_parser.
const app = express();
app.use(bodyParser.json());

//Static Files
app.use(express.static(path.join(__dirname,'build')));

//Connect to MongoDB.
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Hazan:7h3f4EElCOZeSsMQ@myblogcluster-tdbdj.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true})
        .then(()=>{
          console.log('Connected TO DataBase');
        })
        .catch(()=>{
          console.log('Connection Failed');
        })


//Moving To articleRoutes
app.use("/api/articles",articleRoute);


//Go to IndeX.html
app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname,'/build/index.html'));
})
app.listen(8000,() => console.log("Listening on port 8000"));