const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const passport = require("passport")
const passportLocal = require("passport-local").Strategy
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const bodyParser = require("body-parser")
const pino = require("pino")
const helmet = require("helmet")
const app = express()
require('dotenv').config()

const helper = require("./lib/helper")

const mainRoutes = require("./routes/mainRoutes")

const logger = pino({
  level: "debug"
})

const whitelist = ["http://localhost:3000", "https://client.dietgolodplan.ru"]

// Mongoose
connectMongo()
  .then(() => logger.info("Mongo connected"))
  .catch(err => logger.error(err))

async function connectMongo() {
  await mongoose.connect(helper.getMongoUrl())
}

// Middlewares
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(
  session({
    secret: process.env.SESSION_SECRET_CODE,
    resave: true,
    saveUninitialized: true,
  })
)
app.use(cookieParser(process.env.COOKIE_SECRET_CODE))
app.use(passport.initialize())
app.use(passport.session())
require("./lib/passportConfig")(passport)

app.use("/", mainRoutes)

//Start Server
app.listen(4000, () => {
  logger.info("Server Has Started")
})