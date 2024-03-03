import mongoose from "mongoose";


export const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.aetzdx0.mongodb.net/ECOMMERCE?retryWrites=true&w=majority&appName=Cluster0`
    try {
       await  mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true });
       console.log("Database connected Successfully");
    } catch (error){
        console.log('Error while connecting with  the database ', error.message);
    }
}

export default Connection;