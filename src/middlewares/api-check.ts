import { Response, Request, NextFunction } from 'express'

class ApiCheck {

  auth (req: Request, res: Response, next: NextFunction) {

    const auth = req.headers.authorization

    if (!auth) {
      return res.status(403).json({
        success: false,
        message: 'API key not informed'
      })
    }

    const [, token] = auth.split(' ')

    if (token !== process.env.TOKEN_API) {
      return res.status(403).json(
        {
          success: false,
          message: 'Not allowed, invalid API key'
        }
      )
    }

    next()

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error (error: any, req: Request, res: Response, next: NextFunction) {
    if (error) {
      return res.status(400).json(
        {
          success: false,
          message: 'Invalid request'
        }
      )
    }

    next()
  }

}

export default new ApiCheck()
