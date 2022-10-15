import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
import ApiCheck from './middlewares/api-check'

class App {

  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(cors())
    this.express.use(helmet())
    this.express.use(morgan('dev'))
    this.express.use(ApiCheck.error)
  }

  private routes () {
    this.express.use(routes)
  }

}

export default new App().express
