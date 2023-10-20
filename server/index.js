import express from 'express'
import path from 'path'
import logger from 'morgan'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { dbConnection } from './database.js'
import Message from './models/Message.js'

dotenv.config()
const PORT = process.env.PORT ?? 3000


dbConnection()

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

  socket.on('chat message', async (msg) => {
    try {
      const newMsg = new Message({
        message: msg
      })
      await newMsg.save()
    } catch (e) {
      throw new Error(e)
    }
    io.emit('message', msg)
  })

  // const loadNotes = async () => {
  //   const notes = await Message.find()
  //   io.emit('loadnotes', notes)
  //   console.log(notes)
  // }
  // loadNotes()
})

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})