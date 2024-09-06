const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://192.168.124.77:5173'}})

const PORT = 3001


app.get('/', (req, res) => {
    res.send('Servidor WebSocket está rodando');
});

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

server.listen(PORT, '0.0.0.0', () => console.log('server rodando na porta ' + PORT))