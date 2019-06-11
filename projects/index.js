const express = require('express')
const app     = express()
const port    = 3000

app.get('/', (req, res) => {
    console.log("Hello World!")
    
    res.end()
})

app.get('/test', (req, res) => {
    console.log("!!!!!Test!!!!!")
    
    res.end()
})

app.listen(port, () => {
    console.log(`Example API is listening on port ${port}!`)
})