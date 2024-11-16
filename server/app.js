const express = require('express');
const cors = require('cors')
const { db } = require('./src/utils/db')

db()
const app = express();

app.use(express.json())
app.use(cors("*"))

const userRoutes = require('./src/routes/userRoutes');
const carRoutes = require('./src/routes/carRoutes');

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);


app.listen(8000, () => {
    console.log("Server is running on 8000");
})