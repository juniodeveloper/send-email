import app from './app'
import env from 'dotenv'

env.config()

const port = process.env.SERVER_PORT

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})
