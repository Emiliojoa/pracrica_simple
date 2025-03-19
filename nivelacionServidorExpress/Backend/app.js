 import express from 'express'
 import morgan from 'morgan'
 import cors from 'cors'
 import { connect } from './Src/dataBase/db.js'
 import { textRouter } from './Src/Routes/textRoute.js'

 const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
 app.use(morgan('dev'))
 app.use(express.json())
 app.use(textRouter)

 app.listen(3000, () => {
    connect()
     console.log(`Server corriendo en el puerto: PORT🚀`)
 })