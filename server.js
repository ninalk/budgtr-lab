const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()

const Budget = require('./models/budget.js')



app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/budgets', (req, res) => {
    
    // calculate total in bank account
    let bankAccount = 0;
    Budget.forEach(function(budget) {
        bankAccount += Number(budget.amount);
    })

    res.render('index.ejs', {
        allBudgets: Budget,
        bankAccount,
    })
})

app.get('/budgets/new', (req, res) => {
    res.render('new.ejs')
})

app.post('/budgets', (req, res) => {
    console.log(req.body);
    let tags = req.body.tags

    const newBudget = {
        date: req.body.date,
        name: req.body.name,
        from: req.body.from,
        amount: req.body.amount,
        tags: tags.split(', ')
    }
  
    Budget.push(newBudget);
    res.redirect('/budgets');
  });

app.get('/budgets/:id', (req, res) => {
    console.log(req.params.id)
    res.render('show.ejs', {
        budget: Budget[req.params.id]
    })
})



app.listen(3000, () => {
    console.log('listening...')
})