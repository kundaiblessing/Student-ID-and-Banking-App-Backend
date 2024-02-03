//this is for web app

const express = require('express')

const app = express()

const port = 3000

const {createNewAccount, deposit, withdraw, balance, transfer} = require('./db')

app.post('/create', express.json(), (req, res)=>{
    createNewAccount(req.body, (msg)=>{
        res.json({'sts': 'success', msg})
    })
})

app.put('/transfer', express.json(), (req, res)=>{
    transfer(req.body, msg =>{
        res.json({'sts': 'success', msg})
    
    })
})

app.post('/withdraw', express.json(), (req, res)=> {
    withdraw(req.body, msg =>{
        res.json({'sts': 'success', msg})
    })
})

app.put('/deposit', express.json(), (req, res)=>{
    
    deposit(req.body, msg =>{
        req.json({'sts': 'success', msg})
    })
    
})

app.get('/balance/:acId', (req, res) =>{
    console.log(req.params)
    const acId = req.params.acId
    balance(acId, bal=>{
        res.json({bal})
    })
})

app.listen(port, () => {
    console.log(`Digital ID app listening on port ${port}`)
})