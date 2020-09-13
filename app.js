const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/db')

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})

mongoose.connection.on('connected',()=>{
    console.log("conneted to mongodb")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})
mongoose.set('useFindAndModify', false);
require ('./models/user');
require ('./models/post');


app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))



app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})