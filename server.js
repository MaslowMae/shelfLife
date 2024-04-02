const express = require("express")
const sequelize = require("./config/connection")
const path = require("path")
const exhb = require("express-handlebars")
const hb = exhb.create({})
const PORT = process.env.PORT || 3000
const routes = require("./controllers")
const session = require("express-session")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(routes)
app.engine("hanldebars", hb.engine)
app.set("view engine", "handlebars")

const sess ={
    secret:"Super secret secret",
    resave:true,
    saveUninitilize: true
}
app.use(session(sess))

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`listening on PORT ${PORT}`)
    })
})




