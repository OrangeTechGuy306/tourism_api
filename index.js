const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { default: mongoose } = require("mongoose")
require("dotenv").config()


const UserRoutes = require("./routes/UserRoutes")
const TourRoutes = require("./routes/TourRoutes")
const BookingRoutes = require("./routes/BookingRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
const BlogRoutes = require("./routes/BlogRoutes")

// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const app = express()
// app.use(cors())
app.use(cookieParser())
app.use(express.json())


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database connected successfully")
})


app.use("/auth/api", UserRoutes)
app.use("/auth/api", TourRoutes)
app.use("/auth/api", BookingRoutes)
app.use("/auth/api", AdminRoutes)
app.use("/auth/api", BlogRoutes)


app.listen(5000, ()=>{
    console.log("App connected successful")
})
