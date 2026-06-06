import express from 'express'
import authRoute from './routes/auth.route.js'
import createHttpError from 'http-errors'
import errorMiddleware from './middlewares/error.middleware.js'
import authenticateMiddleware from './middlewares/authenticate.middleware.js'
import cors from 'cors'

const app = express()

app.use(cors({
     origin: ["http://localhost:5173"], // allowed origins
     methods: ["GET", "POST", "PUT", "DELETE"],
     credentials: true, // allow cookies if needed
}))

app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/post', authenticateMiddleware ,(req, res)=>{ 
    //console.log(x)
    res.send('post service')
})
//app.use('/api/comment',(req, res)=>{ res.send('comment service')})
//app.use('/api/like',(req, res)=>{ res.send('like service')})

app.use('', (req,res,next)=> {
    return next(createHttpError.NotFound('Resource not found'))
    // res.status(404).json({
    //     message : 'Not Found na ja'
    // })
})

app.use(errorMiddleware)

export default app