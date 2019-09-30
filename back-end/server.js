var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')


var app = express()

var User = require('./models/User')
var Post = require('./models/Post')
var auth = require('./auth')

var posts = [
    { message: 'hola'},
    { message: 'hi'},
    { message: 'opa'}
]

app.use(cors())
app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/post', (req, res) => {
    var post = new Post(req.body)
    post.save((err, result) => {
        if (err)
            console.log('There is an error saving the post')
            res.status(500).send({ message: 'There is an error saving the post'})
           
        res.sendStatus(200)    
    })  
})



app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v  ')
    res.send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }    
})

app.get('/profile/:id', async (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v  ')
        res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }    
})





mongoose.connect('mongodb+srv://mauridev:ElectromecanicA21@maurimongo-pbqll.mongodb.net/pssocial?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err)
        console.log('Connected')
})

app.use('/auth', auth)

app.listen(3001)