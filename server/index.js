require('dotenv').config()
const express = require('express')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasuerController')
const auth = require('./middleware/authMiddleware.js')
const massive = require('massive')

const { CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

const PORT = 4000

app.use(express.json())
app.use(
    session({
        resave: true,
        saveUnauthorized: false,
        secret: SESSION_SECRET,
        // cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('Database Ready!')
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
})
