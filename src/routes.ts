import { Router } from 'express'
import SendEmailController from './controllers/send-email'
import ApiCheck from './middlewares/api-check'

const routes = Router()

routes.post('/api/send/email', ApiCheck.auth, SendEmailController.send)

export default routes
