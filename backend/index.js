const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/attendence");
}
console.log("Connected to Mongo Successfully");

const app = express()
const port = 3013

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`)
})