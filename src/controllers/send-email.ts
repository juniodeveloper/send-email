import Express, { Response } from 'express'
import * as yup from 'yup'
import { sendMail } from '../services/email'

interface IBody {
   to: string,
   from: string,
   subject: string,
   html: string
}

interface TypedRequestBody<T> extends Express.Request {
   body: T
}

const bodyValidation: yup.SchemaOf<IBody> = yup.object().shape(
  {
    to: yup.string().required().email(),
    from: yup.string().required().email(),
    subject: yup.string().required().max(60),
    html: yup.string().required()
  }
)

class SendEmailController {

  async send (req: TypedRequestBody<IBody>, res: Response): Promise<Response> {

    let body: IBody
    try {

      body = await bodyValidation.validate(
        req.body,
        { abortEarly: false }
      )

    } catch (error) {

      const yupError = error as yup.ValidationError
      const errors: Record<string, string> = {}

      yupError.inner.forEach(error => {
        if (!error.path) return
        errors[error.path] = error.message
      })

      return res.status(400).json(
        {
          success: false,
          errors
        }
      )

    }

    try {

      const data = {
        to: body.to,
        from: body.from,
        subject: body.subject,
        html: body.html
      }

      await sendMail(data)

      return res.status(200).json(
        {
          success: true,
          message: 'Your email has been sent successfully'
        }
      )

    } catch (error) {
      return res.status(400).json(
        {
          success: false,
          message: 'We were unable to complete your request'
        }
      )
    }

  }

}

export default new SendEmailController()
