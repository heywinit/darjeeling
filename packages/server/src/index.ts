import 'dotenv/config'
import Fastify from 'fastify'
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '@darjeeling/shared'

const fastify = Fastify({ logger: true })
const httpServer = createServer(fastify.server)

const io = new SocketServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: process.env['CLIENT_URL'] ?? 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// ── Health check ──────────────────────────────────────────────────────────────

fastify.get('/health', async () => ({ status: 'ok' }))

// ── Socket.io placeholder ─────────────────────────────────────────────────────

io.on('connection', (socket) => {
  fastify.log.info(`Client connected: ${socket.id}`)

  socket.on('disconnect', () => {
    fastify.log.info(`Client disconnected: ${socket.id}`)
  })

  socket.on('move', (data) => {
    // Broadcast to the other player
    socket.broadcast.emit('player_moved', {
      playerId: socket.id,
      ...data,
    })
  })

  socket.on('request_chunk', (_data) => {
    // TODO: load chunk from DB and emit chunk_data
  })
})

// ── Start ─────────────────────────────────────────────────────────────────────

const PORT = Number(process.env['PORT'] ?? 3001)

httpServer.listen(PORT, () => {
  fastify.log.info(`Server listening on port ${PORT}`)
})
