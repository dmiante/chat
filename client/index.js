// import { io } from "socket.io-client"
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js"

const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

socket.on('message', (msg) => {
  const item = `<li>${msg}</li>`
  messages.insertAdjacentHTML('beforeend', item)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const messageContent = input.value
  if(messageContent){
    socket.emit('chat message', messageContent)
    input.value = ''
  }
})