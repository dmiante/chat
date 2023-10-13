import express from 'express'
import path from 'path'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const PORT = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

// set static folder
app.use(express.static(path.join(process.cwd(), "client")))
// morgan
app.use(logger('dev'))


io.on('connection', (socket) => {
  console.log('An user has connected!')

  socket.on('disconnect', () => {
    console.log('An user has disconnected')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

// app.get('/', (req, res) => {
//   res.sendFile(process.cwd() + '/client/index.html')
// })

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})