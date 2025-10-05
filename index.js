let express = require("express")
const multer = require("multer")
const path = require("path")

let app = express()

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})


let ads = []


app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.set("views", "views")

app.get("/", (req, res)=>{
    res.render("index", {products: ads})
})

app.get("/post/:id", (req, res)=>{
    let postId = req.params.id
    if (!ads[postId]) {
        res.render("notFound")
        return
    }
    res.render("post", {products: ads[postId]})
})

app.post("/add", upload.fields([{name: "image"}]), (req, res)=>{
    let data = req.body
    data.image = req.files.image.map((file)=>file.filename)
    data.id = ads.length
    ads.push(data)
    res.send({status: "ok"})
})

app.use((req, res, next)=>{
    res.status(404)
    res.render("notFound")
})

app.listen(3000, ()=>console.log("SERVER ON"))
