require("dotenv").config();
const app = require('./app');
const connectDb = require('./config/db')

connectDb();
const port = process.env.SERVER_PORT;

app.listen(port, ()=>{
    console.log(`Server running on port, ${port}`)
})