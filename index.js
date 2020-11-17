const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const ObjectId = require('mongodb').ObjectId
const app = express()
app.use(cors())
const MongoClient = require('mongodb').MongoClient;

 
app.use(bodyParser.json())
const port = 5000 
const password ="c3CGXjunN6XVlLoZ"

const uri = "mongodb+srv://volunteerUser:c3CGXjunN6XVlLoZ@cluster0.zveb3.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });





client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("volunteer");
  
  app.post('/addVolunteer',(req,res)=>{
  const newVolunteer = req.body;
    collection.insertOne(newVolunteer)
    .then(result =>{
      res.send(result)
      console.log(result)
    })
  })
 
     
 
  app.get('/volunteers',(req,res)=>{
     collection.find({})
     .toArray((error,documents)=>{
       res.send(documents)
     })
  })
  
  app.delete('/delete/:id',(req,res)=>{
    console.log(req.params.id)
    collection.deleteOne({_id:ObjectId(req.params.id)})
    .then(result=>{
      
      res.send(result.deletedCount > 0)
    })
  })

});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(port)
})