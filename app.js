var express = require('express');
var cors = require('cors')
var app = express();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


let users = [
    { name: 'Tom', age: 20, id: 1 },
    { name: 'Ben', age: 32, id: 2 },
    { name: 'Rick', age: 25, id: 3 }
]

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/user', upload.none(), (req, res) => {
    const user = req?.body
    users.push(user)
    res.json(req.body)
})

app.put('/user/:id', upload.none(), (req, res) => {
    const user = req?.body
    const updatedUsers = users.filter(u => u?.id !== req.params.id)
    users = [ ...updatedUsers, user ]
    res.json(req.body)
})

app.get('/users', (req, res) => {
    res.json(users)
});

app.get('/user/:id', (req, res) => {
    console.log(req.params.id)
    const user = users.find(u => u.id == req.params.id)
    if(!user){
        res.send('No user found with given id')
    }
    res.json(user)
    //res.send(`User ${ user?.name } had been deleted`)
})

app.get('/user/:id', (req, res) => {
    console.log(req.params.id)
    const filteredUsers = users.filter(u => u.id == req.params.id)
    if(!user){
        res.send('No user found with given id')
    }
    res.json(user)
})

app.delete('/user/:id', (req, res) => {
    const filteredUsers = users.filter(u => u.id != req.params.id)

    if(!filteredUsers){
        res.send('No users')
    }
    users = filteredUsers
    res.json(filteredUsers)
})

app.use(express.json())

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
  