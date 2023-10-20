import { model } from 'mongoose'

const MessageSchema = {
  message: String
}

export default model('Message', MessageSchema)