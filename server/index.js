const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}})

const PORT = 3001

io.on('connection', socket =>{
    console.log('usuario conectado', socket.id)

    socket.on('disconnect', reason =>{
        console.log('usuario desconectado', socket.id)
    })

    socket.on('set_username', username =>{
        socket.data.username = username
        console.log('exibindo username: ' + username)
    })

    socket.on('menssage', text =>{
        io.emit('recive_menssage',{
            text,
            authorId: socket.id,
            authorName: socket.data.username
        })
    })
})

server.listen(PORT, ()=>console.log('server rodando'))