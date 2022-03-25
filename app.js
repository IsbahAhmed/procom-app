const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cronJob = require("./Functions/CronJob");

const userRoutes = require("./Routes/user");
const boardRoutes = require("./Routes/board");
const cardRoutes = require("./Routes/card");

const app = express();
const server = require("http").createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
  origins: '*:*',
  transports: ['polling'],
});

require('dotenv').config()
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/card", cardRoutes);

io.on('connection', async socket => {
  console.log("User Connected To The Server");
})



mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("connected" + result);
    server.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));

  exports.sendMessage = async (data) => {
    io.emit("test", data);
    console.log(data);
    return true;
  };