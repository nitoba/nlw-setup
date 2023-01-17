import cors from '@fastify/cors'
import Fastify from 'fastify'
import { initContainer } from '../config/container'

const { controller } = initContainer()

const app = Fastify()

app.register(cors)

app.get('/get-all-habits', (req, res) => controller.getAll(req, res))

const PORT = 3333

app.listen({ port: PORT }, () => console.log('listening on port ' + PORT))
