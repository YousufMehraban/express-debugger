const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/dogs', (req, res) =>{
    return res.send('You are viewing a dog, whof whof!!!')
})

app.post('/dogs', (req, res)=>{
    return res.send('you have created a new dog kidding')
})

app.get('/foods', function(req, res){
    return res.send('Do you want to have Qabili palau?!')
})

const greetings = {
    en: 'Hello',
    fr: 'Bonjour',
    jp: 'Konnichiva'
}

app.get('/greet/:language', function(req, res){
    const lang = req.params.language
    // console.log(req.params)
    res.send(greetings[lang])
})
//  we can have multiple variable routes as below
app.get('/iphone/:modle/:size/:color', (req, res)=>{
    debugger;
    const model = req.params.modle
    const size = req.params.size
    const color = req.params.color
    console.log(req.headers)
    return res.send(`you have ordered an iPhone ${model} ${size} ${color}!`)
})

app.get('/search', function(req, res){
    const {term, sort} = req.query
    return res.send(`SEARCH PAGE!!! term is ${term} and sort is ${sort}`)
})

app.get('/show-language', function(req, res){
    console.log(req.rawHeaders)
    console.log(req.headers)
    return res.send('Showing Language')
})

app.post('/register', (req, res) =>{
    res.send(`Welcome! ${req.body.username}`)
    console.log(req.body) 
})

app.post('/signup', (req, res)=>{
    const name = req.body.name
    const last = req.body.last
    const email = req.body.email
    return res.send(`Welcom ${name} ${last}, you are ID is ${email}`)
})

let CANDIES =  [
    {'name': 'sugar bear', 'quantity': 22, 'price': 1.99},
    {'name': 'jaw breakers', 'quantity': 11, 'price': 2.00},
    {'name': 'jolly rancher', 'quantity': 33, 'price': 0.99}
    ]

app.get('/candies', (req, res) => {
    return res.json(`${CANDIES}`)
})

app.post('/candies', (req, res) => {
    CANDIES.push(req.body)
    return res.json(`here are the candies -> ${CANDIES}`)
})

app.get('/response', (req, res) => {
    return res.status(201).json(CANDIES)
})


const USERS = [
    {'username': 'khanali', 'password': 123},
    {'username': 'jojo', 'password': 12345}
]

app.get('/users/:username', (req, res) =>{
    const user = USERS.find((v)=> v.username === req.params.username);
    if (!user) res.status(404).send('user not found');
    return res.send(user);
})


app.get('/secret', (req, res) => {
    
    if (req.query.password !== 'popcorn') throw 'Entered Wrong Password!'
    return res.send('Congrats, you know the password!')
})

app.listen(3000, function(){
    console.log('app is running on localhost port 3000')
})

