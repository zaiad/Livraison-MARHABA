const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://zaiad:zaiad99@zaiadcluster.v9hssbf.mongodb.net/?retryWrites=true&w=majority',()=>{
//     console.log('connected')
// });
const connectDB  = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.hos}`.cyan.underline)
    } catch(error){
        console.log('error');
        process.exit(1)
    }
}

module.exports = connectDB