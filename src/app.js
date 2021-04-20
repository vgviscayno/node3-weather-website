const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name:'Vonrie Viscayno'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name:'Vonrie Viscayno'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:'Vonrie Viscayno',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastResult) => {
            if (error) {
                return res.send({error})
            }

            return res.send({
                forecast: forecastResult,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article - 404',
        errorMessage: 'Help article not found',
        name:'Vonrie Viscayno'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name:'Vonrie Viscayno'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})