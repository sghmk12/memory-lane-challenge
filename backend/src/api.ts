import { eq } from 'drizzle-orm'
import express, { Request, Response } from 'express'
import db, { schema } from './db'
const cors = require('cors')

const app = express()
const PORT = (process.env.API_PORT as number | undefined) ?? 4001

app.use(express.json())
app.use(cors())

// // Initialize database - migrations would be better in production
// async function initializeDatabase() {
//   await db.run(sql`
//     CREATE TABLE IF NOT EXISTS memories (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT NOT NULL,
//       description TEXT NOT NULL,
//       timestamp TEXT NOT NULL
//     )
//   `)
// }

// initializeDatabase()
// Get all memories
app.get('/memories', async (req: Request, res: Response) => {
  try {
    const allMemories = await db.select().from(schema.memories).all()
    res.json({ memories: allMemories })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// Create a memory
app.post('/memories', async (req: Request, res: Response) => {
  const { name, description, timestamp } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  try {
    await db.insert(schema.memories).values({
      name,
      description,
      timestamp,
    })
    res.status(201).json({ message: 'Memory created successfully' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// Get a single memory
app.get('/memories/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const memory = await db
      .select()
      .from(schema.memories)
      .where(eq(schema.memories.id, Number(id)))
      .get()

    if (!memory) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// Update a memory
app.put('/memories/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description, timestamp } = req.body

  if (!name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  try {
    await db
      .update(schema.memories)
      .set({ name, description, timestamp })
      .where(eq(schema.memories.id, Number(id)))
    res.json({ message: 'Memory updated successfully' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// Delete a memory
app.delete('/memories/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await db.delete(schema.memories).where(eq(schema.memories.id, Number(id)))
    res.json({ message: 'Memory deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
