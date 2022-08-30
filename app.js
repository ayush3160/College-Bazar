require('dotenv').config()
const express = require('express')
const path = require('path');
const socket = require('socket.io')
require("./database/db")

const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const messageRoutes = require("./routes/messages");
const productController = require('./controllers/product')

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())


// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next()
  // normal change
// });

app.use('/api/auth', authRouter);
app.use('/api/product',productRouter);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, './frontend/build')));
  
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
    });
}



const server = app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log(userId, socket.id)
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(data)
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});


