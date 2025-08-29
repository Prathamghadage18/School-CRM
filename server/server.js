import app from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 5000;

// CONNECT TO THE DATABASE
connectDB();


app.listen(PORT,() => {
    console.log("Server running on ${PORT}");
});