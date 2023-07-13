const express = require("express");
const routerApi = require("./routes/router");
const { logErrors, errorHandler, boomErrorHandler, queryErrorHandler } = require("./middlewares/error.handler")
const cors = require("cors")

const app = express()
const port = 3666

const whiteList = ["https://localhost:3666", "https://railway.app/project/2a417bce-4d72-472c-bb9b-42663e23d3ca"]
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin)) {
      cb(null, true)
    }
    else {
      cb(new Error("Not allowed"))
    }
  }
}
// app.use(express.json(), cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send("This is my server on express.js")
})

app.get('/eo', (req, res) => {
  res.send("Ĉi tiu estas mia servilo sur express.js")
})

routerApi(app);
app.use(logErrors)
app.use(queryErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('running on port: ' + port);
})
