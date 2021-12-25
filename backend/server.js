const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');

//config
dotenv.config({ path: "backend/config/config.env" });
// Connecting to database
connectDatabase();

// This displays message that the server running and listening to specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is working on http//:localhost:${process.env.PORT}`)
}); //Line 6
