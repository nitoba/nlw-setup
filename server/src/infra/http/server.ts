import * as dotenv from 'dotenv'
import cors from '@fastify/cors'
import Fastify from 'fastify'
import FastifyJwt from '@fastify/jwt'
import { Router } from './routes'
dotenv.config()

const app = Fastify()

const JWT_SECRET = process.env.JWT_SECRET as string

app.register(cors)
Router(app)
app.register(FastifyJwt, { secret: JWT_SECRET })

const PORT = 3333

app.listen({ port: PORT }, () => console.log('listening on port ' + PORT))
