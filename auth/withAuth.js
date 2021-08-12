import jwt from "next-auth/jwt"

const secret = process.env.SECRET

export default function withAuth(handler) {
  return async (req, res) => {
    // console.log(req.headers)

    try {
      req.auth = await jwt.getToken({ req, secret })

      if (!req.auth) {
        return res.status(401).end()
      }
    } catch (ignore) {
      if (req.origin) return res.status(401).end()
    }

    try {
      const { get, post, put } = handler(req, res)

      if (req.method === "GET" && get) {
        return await get()
      } else if (req.method === "POST" && post) {
        return await post()
      } else if (req.method === "PUT" && put) {
        return await put()
      } else {
        return res.status(405).end("Method not supported")
      }
    } catch (error) {
      if (error.response) {
        const { status, statusText } = error.response

        return res.status(status).end(statusText)
      } else {
        return res.status(500).end("Something went wrong")
      }
    }
  }
}
