require("./mongo");
require("dotenv").config();
// require("./cron_job/cron");
const chatController = require("./controller/chatDataController");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./utils/auth");
require("express-async-errors");
const userRouters = require("./routes/userRoutes");
const customerRouters = require("./routes/customerRoutes");
const productRouters = require("./routes/productRoutes");
const orderRouters = require("./routes/orderRoutes");
const paymentRouters = require("./payment");
const chatRouters = require("./routes/chatDataRoutes");


const app = express();

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use(express.static(__dirname + "/public"));
app.get("/s", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.use(passport.initialize());
app.use(passport.session());

const middleware = require("./utils/middleware");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouters);
app.use("/products", productRouters);
app.use("/customers", customerRouters);
app.use("/orders", orderRouters);
app.use("/payments", paymentRouters);
app.use("/chat", chatRouters);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// app.listen(PORT, () => {
//   console.log(`YOUR SERVER IS WORKING AT PORT ${PORT}`);
// });
/////////////////////

const http = require("http").createServer(app);
http.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

// app.use(express.static(__dirname + "/public"));
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
const io = require("socket.io")(http);
var count = 0;
io.on("connection", (socket) => {
  count++;
  console.log(socket.id, "is online");
  socket.on("message", (msg) => {
    console.log(msg);
    /////////////////////
    
    const funcData = async () => {
      const result = await chatController.saveUserChat({
        "name": msg.user,
        "userId": socket.id,
        "message": msg.message});
      console.log(result)
      return result
      // await userController.saveUserChat(req);
    }
    funcData()
    ////////////////
    socket.broadcast.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log(socket.id, "is offline");
    count--;
    console.log("total users online:-", count);
  });
  console.log("total users online:-", count);
});




