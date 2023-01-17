import cors from '@fastify/cors'
import Fastify from 'fastify'
import { Router } from './routes'

const app = Fastify()

app.register(cors)
Router(app)

const PORT = 3333

app.listen({ port: PORT }, () => console.log('listening on port ' + PORT))
