const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        mongoose.connect(process.env.MONGOOSE_URI);
        console.log('Database connected')
    }catch(err){
        console.error("DB connection failed:",err.message)
        process.exit(1)
    }
}

module.exports = connectDb;
