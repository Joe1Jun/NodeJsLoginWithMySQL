//import express
const express = require("express");
//import path 
const path = require("path");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({
    path: './.env'

});

const app = express();

// create connection to database
const database = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE // Use the DATABASE environment variable for the database name
});



// dirname gives you access to directory you are in 
// join dirname with public folder
const publicDirectory = path.join(__dirname, './public')
//make sure express uses this directory
app.use(express.static(publicDirectory));



//parse url encoded bodies as sent by HTML forms
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies as sent by API clients

app.use(express.json());

app.set('view engine', 'hbs');

//connect to database 
database.connect((error) =>{

    if (error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected....")
    }
}
)


app.use('/', require("./routes/pages"));
app.use("/auth", require("./routes/auth"));



app.listen(5000, () => {

    console.log("Server started on Port 5000");
})


