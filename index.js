let express = require("express")

let ads = []

let app = express()
app.use(express.static("static"))
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "views")

app.get("/", (req, res)=>{
    res.render("index", {products: ads})
})

app.post("/add", (req, res)=>{
    ads.push(req.body)
    console.log(req.body)
    res.send({status: "ok"})
})

app.use((req, res, next)=>{
    res.status(404)
    res.render("notFound")
})

app.listen(3000, ()=>console.log("SERVER ON"))
