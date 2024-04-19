const { configDotenv } = require('dotenv');
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const UserRouter = require('./routes/userRoutes');
const DebateRouter = require('./routes/debateRoutes');
const ArgRouter = require('./routes/argRoutes');
const Server = require('socket.io');

configDotenv({path:'./.env'});
const port = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;


const app = express();

app.use(cors());
app.use(express.json());
app.use('/user',UserRouter);
app.use('/debate',DebateRouter);
app.use('/args',ArgRouter);

app.get('/', (req,res)=>{
    return res.send("Hallo");
})

mongoose.connect(DB_URL).then(()=>{
    console.log('DB Connected');
}).catch((error)=>{
    console.log(error);
});

const server = app.listen(port, console.log(`up on ${port}`));

const io = Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
});

io.on("connection",(socket)=>{
    //console.log("user connected");

    socket.on('joinDebate',(debateId)=>{
        socket.join(debateId);
    });

    socket.on("newArgPost", (data)=>{
        io.to(data.debate).emit('newArgReceive', data);
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
});