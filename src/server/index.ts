import express from 'express'
import { renderer } from './render'

const app = express()
app.get("*.ico", async (req, res) => {
    res.sendStatus(200)
})
app.use('/build', express.static('build', { fallthrough: false }))
app.get('*', async (req, res) => {
    await renderer(req, res)
})

const server = app.listen(3000, () => {
    return console.log(`server started and 3000`)
})