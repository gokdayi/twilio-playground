const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('express-jwt')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`)
})