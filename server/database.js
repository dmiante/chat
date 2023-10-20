import { connect } from 'mongoose'

export async function dbConnection () {

  try {
    await connect(process.env.DB_CONN)
    
    console.log('🟢 DB online')
  } catch (error) {
    console.error(error)
    throw new Error('Error to connect the db')
  }
}