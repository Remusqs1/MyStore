const express = require("express");
const routerApi = require("./routes/router");
const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler")
const cors = require("cors")

const app = express()
const port = 3666

const whiteList = ["http://localhost:8080", "https://myAppUrl.com"]
const options = {
    origin: (origin, cb) =>{
      if(whiteList.includes(origin)){
        cb(null, true)
      }
      else{
        cb(new Error("Not allowed"))
      }
    }
}
app.use(express.json(), cors(options))

app.get('/', (req, res) => {
  res.send("This is my server on express.js")
})

app.get('/eo', (req, res) => {
  res.send("Ĉi tiu estas mia servilo sur express.js")
})

routerApi(app);
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('running on port: ' + port);
})
