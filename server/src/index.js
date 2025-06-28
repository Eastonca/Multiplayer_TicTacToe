import express from 'express'
import cors from 'cors'
import { StreamChat } from 'stream-chat'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
const app = express()
const API_KEY = 'fesubwdmacwe'
const API_SECRET =
  'yjws56n5hhzvewumk8ufwhucfm4vbnqw67udjjb73qwa35y4krqcjxag7hnfzffw'

app.use(cors())
app.use(express.json())
const serverClient = new StreamChat(API_KEY, API_SECRET)

app.post('/signup', async (req, res) => {
  try {
    console.log('signup request received')
    const { firstName, lastName, username, password } = req.body
    const userId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)
    const token = serverClient.createToken(userId)
    console.log(`token generated`)
    res.json({ token, userId, firstName, lastName, username, hashedPassword })
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.post('/login', async (req, res) => {
  try {
    console.log('login request received')
    const { username, password } = req.body
    console.log(`user ${username} with password ${password} tried to log in`)
    const { users } = await serverClient.queryUsers({ name: username })
    if (users.length === 0) return res.json({ message: 'User not found' })
    console.log(`User found`)
    const token = serverClient.createToken(users[0].id)
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    )

    if (!passwordMatch) {
      return res.json({ message: 'Invalid password' })
    }

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id
      })
    }
  } catch (error) {
    res.json(error)
  }
})

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})
