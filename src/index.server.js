const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const path =  require('path');
const app = express();
app.use(express.json());
app.use(cors());


// To get environment variable
dotenv.config({path: './config.env'})

const PORT = process.env.Port
const DB_URL = process.env.Database2

// Connent with database
mongoose.connect(DB_URL , 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: true
}
).then(()=> console.log('Database connected'))
.catch((err)=> console.log(err))

// Setting up router
const authRoutes = require('./routes/auth')
const companyRoutes = require('./routes/Company/auth')
const eventRoutes = require('./routes/event')


app.use(authRoutes)
app.use(companyRoutes)
app.use(eventRoutes)


app.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`)
})