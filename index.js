const express = require("express");
const app = express();
const PORT = 1331;
const userRoute = require('./Routes/user');
const productRoute = require('./Routes/product');

const { connectDB } = require('./config/db');


//midddlewares
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({ extends: false }));


app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);



app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    connectDB();
})